'use strict';
// ==UserScript==
// @name         Wikipedia GeoHack: Add Ingress Intel link
// @namespace    http://github.com/IgnoredAmbience
// @version      0.1
// @description  Add Ingress Intel link to Wikipedia's GeoHack page.
// @author       IgnoredAmbience
// @match        https://tools.wmflabs.org/geohack/geohack.php*
// @resource     icon https://www.ingress.com/favicon.ico
// @grant        GM_getResourceURL
// ==/UserScript==

try {
  let geo = document.body.getElementsByClassName("geo")[0];
  let lat = parseFloat(geo.getElementsByClassName("latitude")[0].innerText);
  let lon = parseFloat(geo.getElementsByClassName("longitude")[0].innerText);
  if (Number.isNaN(lat) || Number.isNaN(lon)) { throw new Error("Could not parse geo microformat"); }

  let tbody = document.evaluate(
    '//*[@id="GEOTEMPLATE-GLOBAL"]/table/tbody',
    document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  tbody.insertAdjacentHTML("beforeend", `
    <tr style="background:LemonChiffon">
      <th scope="row" style="font-weight:bold; text-align:left;"><img src="${GM_getResourceURL("icon")}" width="16" height="16"> Ingress Intel</th>
      <td><a rel="nofollow" class="external text" href="https://www.ingress.com/intel?ll=${lat},${lon}&z=15">Map</a></td>
      <td></td>
      <td></td>
    </tr>
  `);
} catch (e) {
  throw e;
}
