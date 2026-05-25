import type { CookiePreferences } from "./types";
import { getActiveTrackers, type TrackerId } from "./tracking-config";

const SCRIPT_ATTR = "data-cde-tracker";

function scriptSelector(id: TrackerId): string {
  return `script[${SCRIPT_ATTR}="${id}"]`;
}

function injectScript(id: TrackerId, src: string, async = true): void {
  if (document.querySelector(scriptSelector(id))) return;
  const el = document.createElement("script");
  el.setAttribute(SCRIPT_ATTR, id);
  if (async) el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

function injectInlineScript(id: TrackerId, content: string): void {
  if (document.querySelector(scriptSelector(id))) return;
  const el = document.createElement("script");
  el.setAttribute(SCRIPT_ATTR, id);
  el.textContent = content;
  document.head.appendChild(el);
}

function removeTrackerScripts(id: TrackerId): void {
  document.querySelectorAll(scriptSelector(id)).forEach((node) => node.remove());
}

/** Load configured third-party scripts for consented categories only */
export function loadConsentedScripts(prefs: CookiePreferences): void {
  if (typeof document === "undefined") return;

  const categories: Array<keyof CookiePreferences> = ["analytics", "marketing", "preferences"];

  for (const category of categories) {
    if (!prefs[category]) {
      getActiveTrackers(category).forEach((t) => removeTrackerScripts(t.id));
      continue;
    }

    for (const tracker of getActiveTrackers(category)) {
      const value = tracker.getValue()?.trim();
      if (!value) continue;

      switch (tracker.id) {
        case "gtm":
          injectInlineScript(
            "gtm",
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${value}');`,
          );
          break;
        case "ga4":
          injectScript("ga4", `https://www.googletagmanager.com/gtag/js?id=${value}`);
          injectInlineScript(
            "ga4",
            `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${value}',{anonymize_ip:true});`,
          );
          break;
        case "plausible": {
          if (document.querySelector(scriptSelector("plausible"))) break;
          const el = document.createElement("script");
          el.setAttribute(SCRIPT_ATTR, "plausible");
          el.defer = true;
          el.dataset.domain = value;
          el.src = "https://plausible.io/js/script.js";
          document.head.appendChild(el);
          break;
        }
        case "hotjar":
          injectInlineScript(
            "hotjar",
            `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${value},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          );
          break;
        case "meta-pixel":
          injectInlineScript(
            "meta-pixel",
            `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${value}');fbq('track','PageView');`,
          );
          break;
        case "linkedin":
          injectInlineScript(
            "linkedin",
            `_linkedin_partner_id="${value}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
          );
          injectScript(
            "linkedin",
            "https://snap.licdn.com/li.lms-analytics/insight.min.js",
          );
          break;
        default:
          break;
      }
    }
  }
}

/** Remove all non-essential tracker scripts (e.g. after consent revoked) */
export function unloadNonEssentialScripts(): void {
  getActiveTrackers("analytics")
    .concat(getActiveTrackers("marketing"), getActiveTrackers("preferences"))
    .forEach((t) => removeTrackerScripts(t.id));
}
