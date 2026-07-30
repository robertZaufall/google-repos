const UPSTREAM = "https://robertzaufall.github.io/google-repos/";

export default {
  async fetch(request) {
    const sourceUrl = new URL(request.url);
    const targetUrl = new URL(UPSTREAM);
    const suffix = sourceUrl.pathname.replace(/^\/google\/?/, "");
    targetUrl.pathname = `/google-repos/${suffix}`;
    targetUrl.search = sourceUrl.search;

    const upstreamRequest = new Request(targetUrl, request);
    const response = await fetch(upstreamRequest);
    const headers = new Headers(response.headers);
    headers.set("x-rob-proxy", "google");
    headers.set("cache-control", headers.get("cache-control") || "max-age=600");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
