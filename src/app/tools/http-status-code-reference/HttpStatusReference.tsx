"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

type StatusCode = {
  code: number;
  phrase: string;
  category: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
  description: string;
  rfc: string;
};

const statusCodes: StatusCode[] = [
  { code: 100, phrase: "Continue", category: "1xx", description: "The server has received the request headers and the client should proceed to send the request body.", rfc: "RFC 9110" },
  { code: 101, phrase: "Switching Protocols", category: "1xx", description: "The requester has asked the server to switch protocols and the server has agreed to do so.", rfc: "RFC 9110" },
  { code: 200, phrase: "OK", category: "2xx", description: "Standard response for successful HTTP requests. The actual response will depend on the request method used.", rfc: "RFC 9110" },
  { code: 201, phrase: "Created", category: "2xx", description: "The request has been fulfilled, resulting in the creation of a new resource.", rfc: "RFC 9110" },
  { code: 202, phrase: "Accepted", category: "2xx", description: "The request has been accepted for processing, but the processing has not been completed.", rfc: "RFC 9110" },
  { code: 204, phrase: "No Content", category: "2xx", description: "The server successfully processed the request and is not returning any content.", rfc: "RFC 9110" },
  { code: 301, phrase: "Moved Permanently", category: "3xx", description: "This and all future requests should be directed to the given URI.", rfc: "RFC 9110" },
  { code: 302, phrase: "Found (Moved Temporarily)", category: "3xx", description: "Tells the client to look at (browse to) another URL temporarily.", rfc: "RFC 9110" },
  { code: 304, phrase: "Not Modified", category: "3xx", description: "Indicates that the resource has not been modified since the version specified by the request headers.", rfc: "RFC 9110" },
  { code: 307, phrase: "Temporary Redirect", category: "3xx", description: "In this case, the request should be repeated with another URI; however, future requests should still use the original URI.", rfc: "RFC 9110" },
  { code: 308, phrase: "Permanent Redirect", category: "3xx", description: "The request and all future requests should be repeated using another URI.", rfc: "RFC 9110" },
  { code: 400, phrase: "Bad Request", category: "4xx", description: "The server cannot or will not process the request due to an apparent client error (e.g., malformed syntax).", rfc: "RFC 9110" },
  { code: 401, phrase: "Unauthorized", category: "4xx", description: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.", rfc: "RFC 9110" },
  { code: 403, phrase: "Forbidden", category: "4xx", description: "The request contained valid data and was understood by the server, but the server is refusing action.", rfc: "RFC 9110" },
  { code: 404, phrase: "Not Found", category: "4xx", description: "The requested resource could not be found but may be available in the future.", rfc: "RFC 9110" },
  { code: 405, phrase: "Method Not Allowed", category: "4xx", description: "A request method is not supported for the requested resource (e.g. GET on a form requiring POST).", rfc: "RFC 9110" },
  { code: 408, phrase: "Request Timeout", category: "4xx", description: "The server timed out waiting for the request.", rfc: "RFC 9110" },
  { code: 409, phrase: "Conflict", category: "4xx", description: "Indicates that the request could not be processed because of conflict in the current state of the resource.", rfc: "RFC 9110" },
  { code: 422, phrase: "Unprocessable Content", category: "4xx", description: "The request was well-formed but was unable to be followed due to semantic errors.", rfc: "RFC 9110" },
  { code: 429, phrase: "Too Many Requests", category: "4xx", description: "The user has sent too many requests in a given amount of time ('rate limiting').", rfc: "RFC 6585" },
  { code: 500, phrase: "Internal Server Error", category: "5xx", description: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.", rfc: "RFC 9110" },
  { code: 502, phrase: "Bad Gateway", category: "5xx", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", rfc: "RFC 9110" },
  { code: 503, phrase: "Service Unavailable", category: "5xx", description: "The server cannot handle the request (because it is overloaded or down for maintenance).", rfc: "RFC 9110" },
  { code: 504, phrase: "Gateway Timeout", category: "5xx", description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.", rfc: "RFC 9110" },
];

export function HttpStatusReference() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return statusCodes.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.code.toString().includes(q) ||
        item.phrase.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "2xx": return "var(--accent)";
      case "3xx": return "#f59e0b";
      case "4xx": return "#ef4444";
      case "5xx": return "#dc2626";
      default: return "var(--muted)";
    }
  };

  return (
    <section className="json-tool" aria-label="HTTP Status Code Reference tool">
      <div className="tool-controls" style={{ flexWrap: "wrap", gap: 12 }}>
        <div className="control-group" style={{ flex: 1, minWidth: 240 }}>
          <input
            type="text"
            className="code-editor"
            style={{ height: 38, padding: "0 12px", border: "1px solid var(--line)", borderRadius: 6 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search status code (e.g. 404, Unauthorized, Gateway)..."
          />
        </div>
        <div className="control-group" style={{ gap: 6 }}>
          {["all", "1xx", "2xx", "3xx", "4xx", "5xx"].map((cat) => (
            <button
              key={cat}
              className={`button ${activeCategory === cat ? "button-primary" : "button-quiet"}`}
              type="button"
              style={{ fontSize: 11, padding: "4px 10px" }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12, marginTop: 14 }}>
        {filtered.map((item) => (
          <div key={item.code} className="editor-panel" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 18, fontWeight: 700, color: getCategoryColor(item.category) }}>
                  {item.code}
                </span>
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{item.phrase}</span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--faint)", background: "var(--surface)", padding: "2px 6px", borderRadius: 4 }}>
                {item.rfc}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-soft)", margin: 0, lineHeight: 1.5 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
