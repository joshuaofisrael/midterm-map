import assert from "node:assert/strict";
import test from "node:test";
import { countiesForState, placeBySlug, placeStates, placesForState } from "../data/places/load.ts";
import { cityIsIndexable, countIndexableCities, thinZeroRedirectTarget } from "./cityIndexable.ts";
import { cityIsThin } from "./cityThin.ts";
import { placeIsStandalone } from "./placeNames.ts";
import {
  PRUNED_CITY_COUNT,
  PRUNED_COUNTY_COUNT,
  PRUNED_PAGE_COUNT,
  countyHrefBySlug,
  isPrunedCity,
  isPrunedCounty,
  linkedPlaceHref,
  prunedRedirectTarget,
  searchPlaceHref,
} from "./prunedPlaces.ts";

test("prune list is the 3,061 confirmed pages and nothing else", () => {
  assert.equal(PRUNED_PAGE_COUNT, 3061);
  assert.equal(PRUNED_CITY_COUNT, 910);
  assert.equal(PRUNED_COUNTY_COUNT, 2151);
  assert.equal(isPrunedCity("AK", "chignik-city"), true);
  assert.equal(isPrunedCounty("AK", "aleutians-east-borough"), true);
  assert.equal(prunedRedirectTarget("/cities/AK/chignik-city/"), "/cities/AK/");
  assert.equal(prunedRedirectTarget("/cities/AK/chignik-city"), "/cities/AK/");
  assert.equal(prunedRedirectTarget("/cities/AK/county/aleutians-east-borough/#x"), "/cities/AK/");
  assert.equal(prunedRedirectTarget("/cities/AK/"), null);
  assert.equal(prunedRedirectTarget("/cities/NY/new-york-city/"), null);
});

test("every pruned URL is a real page that the sitemap lists today, and kept pages stay linked", () => {
  let prunedCities = 0;
  let prunedCounties = 0;
  let removedFromSitemap = 0;
  for (const state of placeStates()) {
    for (const county of countiesForState(state.code)) {
      if (!isPrunedCounty(state.code, county.slug)) {
        assert.equal(countyHrefBySlug(state.code, county.slug), `/cities/${state.code}/county/${county.slug}/`);
        continue;
      }
      prunedCounties += 1;
      removedFromSitemap += 1;
      assert.equal(countyHrefBySlug(state.code, county.slug), null);
    }
    for (const place of placesForState(state.code)) {
      if (isPrunedCity(state.code, place.slug)) {
        assert.equal(placeIsStandalone(place), true);
        assert.equal(cityIsThin(state.code, place), false);
        assert.equal(linkedPlaceHref(state.code, place), null);
        prunedCities += 1;
        removedFromSitemap += 1;
        continue;
      }
      if (!placeIsStandalone(place)) continue;
      const href = linkedPlaceHref(state.code, place);
      assert.equal(href, `/cities/${state.code}/${place.slug}`);
    }
  }
  assert.equal(prunedCities, PRUNED_CITY_COUNT);
  assert.equal(prunedCounties, PRUNED_COUNTY_COUNT);
  assert.equal(removedFromSitemap, 3061);
  const nyc = placeBySlug("NY", "new-york-city");
  assert.ok(nyc);
  assert.equal(isPrunedCity("NY", "new-york-city"), false);
  assert.equal(linkedPlaceHref("NY", nyc), "/cities/NY/new-york-city");
  assert.equal(searchPlaceHref("AK", "chignik-city", "/cities/AK/chignik-city/"), "/cities/AK/");
  assert.equal(searchPlaceHref("NY", "new-york-city", "/cities/NY/new-york-city/"), "/cities/NY/new-york-city/");
});

test("thin places with impressions stay indexable and zero-impression templates redirect", () => {
  const nyc = placeBySlug("NY", "new-york-city");
  assert.ok(nyc);
  assert.equal(cityIsIndexable("NY", nyc), true);
  assert.equal(thinZeroRedirectTarget("/cities/NY/new-york-city/"), null);
  const visitedThin = placeBySlug("FL", "university-cdp-73172");
  assert.ok(visitedThin);
  assert.equal(cityIsThin("FL", visitedThin), true);
  assert.equal(cityIsIndexable("FL", visitedThin), true);
  let thinZero = 0;
  for (const state of placeStates()) {
    for (const place of placesForState(state.code)) {
      if (!placeIsStandalone(place) || isPrunedCity(state.code, place.slug)) continue;
      if (cityIsIndexable(state.code, place)) continue;
      assert.equal(cityIsThin(state.code, place), true);
      assert.equal(thinZeroRedirectTarget(`/cities/${state.code}/${place.slug}/`), `/cities/${state.code}/`);
      thinZero += 1;
      if (thinZero > 3) break;
    }
    if (thinZero > 3) break;
  }
  assert.ok(thinZero > 0);
  assert.ok(countIndexableCities() > 16000);
});
