// Comprehensive HTTP Status Code Database
const statusCodesData = {
  "1xx": {
    "name": "Informational",
    "description": "The request was received and the process is continuing",
    "color": "blue",
    "codes": {
      "100": {
        "name": "Continue",
        "description": "The server has received the request headers and the client should proceed to send the request body.",
        "whenItOccurs": "When a client makes a request with an Expect: 100-continue header, indicating it wants to send a large request body.",
        "commonCauses": [
          "Large file uploads or POST requests with significant data",
          "Client attempting to verify server can handle the request before sending body",
          "API requests with preliminary header validation"
        ],
        "howToFix": [
          "This is a normal intermediate response - no fix needed",
          "Ensure your client can handle 100-continue responses properly",
          "Configure server timeout settings appropriately for large uploads"
        ],
        "relatedCodes": ["417", "200"]
      },
      "101": {
        "name": "Switching Protocols",
        "description": "The server is switching protocols as requested by the client.",
        "whenItOccurs": "When upgrading from HTTP to WebSocket or HTTP/2",
        "commonCauses": [
          "WebSocket connection establishment",
          "Protocol upgrade requests (HTTP/1.1 to HTTP/2)",
          "Upgrade header in client request"
        ],
        "howToFix": [
          "This is a normal protocol switching response",
          "Ensure both client and server support the target protocol",
          "Verify firewall/proxy allows protocol upgrades"
        ],
        "relatedCodes": ["426", "200"]
      },
      "102": {
        "name": "Processing",
        "description": "The server has received and is processing the request, but no response is available yet.",
        "whenItOccurs": "With WebDAV requests that take a long time to process",
        "commonCauses": [
          "Long-running WebDAV operations",
          "Complex PROPFIND requests",
          "Server-side processing of large file operations"
        ],
        "howToFix": [
          "This is a normal intermediate response for WebDAV",
          "Implement proper timeout handling on the client",
          "Consider chunking large operations if timeouts occur"
        ],
        "relatedCodes": ["200", "207", "504"]
      },
      "103": {
        "name": "Early Hints",
        "description": "Used to return some response headers before final HTTP message.",
        "whenItOccurs": "When server wants to preload resources while preparing the full response",
        "commonCauses": [
          "Server sending Link headers for critical resources",
          "Optimization for faster page loads",
          "Preloading stylesheets, scripts, or fonts"
        ],
        "howToFix": [
          "This is an optimization feature - no fix needed",
          "Ensure CDN/proxy supports 103 Early Hints",
          "Verify client browser can process early hints"
        ],
        "relatedCodes": ["200"]
      }
    }
  },
  "2xx": {
    "name": "Success",
    "description": "The request was successfully received, understood, and accepted",
    "color": "green",
    "codes": {
      "200": {
        "name": "OK",
        "description": "The request succeeded. The meaning depends on the HTTP method used.",
        "whenItOccurs": "When a request is successfully processed and a response is returned",
        "commonCauses": [
          "Successful GET request retrieving data",
          "Successful POST request creating or updating data",
          "Successful PUT/PATCH request modifying resources"
        ],
        "howToFix": [
          "This is a success status - no fix needed",
          "Ensure response body contains expected data",
          "Verify content-type header matches response format"
        ],
        "relatedCodes": ["201", "204"]
      },
      "201": {
        "name": "Created",
        "description": "The request succeeded and a new resource was created as a result.",
        "whenItOccurs": "After successfully creating a new resource (typically with POST or PUT)",
        "commonCauses": [
          "POST request creating a new database record",
          "File upload successfully saved",
          "New user registration completed"
        ],
        "howToFix": [
          "This is a success status - no fix needed",
          "Ensure Location header points to the new resource",
          "Verify the resource was actually created in your database"
        ],
        "relatedCodes": ["200", "202"]
      },
      "202": {
        "name": "Accepted",
        "description": "The request has been accepted for processing, but processing is not complete.",
        "whenItOccurs": "When a request is queued for asynchronous processing",
        "commonCauses": [
          "Batch processing jobs",
          "Async API operations",
          "Email sending queues",
          "Video transcoding requests"
        ],
        "howToFix": [
          "This is a success status - no fix needed",
          "Implement polling or webhooks to check job status",
          "Provide a status endpoint for the queued operation"
        ],
        "relatedCodes": ["200", "201"]
      },
      "203": {
        "name": "Non-Authoritative Information",
        "description": "The request was successful but the returned metadata may be from a cached or modified source.",
        "whenItOccurs": "When a proxy or cache modifies response headers",
        "commonCauses": [
          "Proxy server modifying headers",
          "CDN transforming responses",
          "Cached content with updated headers"
        ],
        "howToFix": [
          "This is generally acceptable - verify content accuracy",
          "Check if proxy/CDN modifications are expected",
          "Use Cache-Control headers to control caching behavior"
        ],
        "relatedCodes": ["200", "304"]
      },
      "204": {
        "name": "No Content",
        "description": "The request succeeded but there is no content to send back.",
        "whenItOccurs": "After successful DELETE operations or PUT updates with no response body",
        "commonCauses": [
          "Successful DELETE request",
          "Successful PUT/PATCH with no response needed",
          "Saving preferences or settings"
        ],
        "howToFix": [
          "This is a success status - no fix needed",
          "Don't expect a response body with this status",
          "Use 200 instead if you need to return data"
        ],
        "relatedCodes": ["200", "205"]
      },
      "205": {
        "name": "Reset Content",
        "description": "Tells the client to reset the document view which sent this request.",
        "whenItOccurs": "After form submission when the form should be cleared",
        "commonCauses": [
          "Form submission successfully processed",
          "Survey or questionnaire completed",
          "Data entry form needs to be reset"
        ],
        "howToFix": [
          "This is a success status - no fix needed",
          "Client should reset/clear the form",
          "Implement form reset logic in your application"
        ],
        "relatedCodes": ["200", "204"]
      },
      "206": {
        "name": "Partial Content",
        "description": "The server is delivering only part of the resource due to a range header sent by the client.",
        "whenItOccurs": "During video streaming, large file downloads, or resume operations",
        "commonCauses": [
          "Video/audio streaming",
          "Download resume functionality",
          "Large file requests with Range header"
        ],
        "howToFix": [
          "This is a success status for range requests",
          "Ensure server supports Range headers",
          "Verify Content-Range header is correctly set",
          "Check that file byte ranges are valid"
        ],
        "relatedCodes": ["200", "416"]
      },
      "207": {
        "name": "Multi-Status",
        "description": "A Multi-Status response conveys information about multiple resources (WebDAV).",
        "whenItOccurs": "In WebDAV operations affecting multiple resources",
        "commonCauses": [
          "WebDAV PROPFIND requests",
          "Batch operations on multiple files",
          "Multiple resource property queries"
        ],
        "howToFix": [
          "This is a success status for WebDAV",
          "Parse the XML response body for individual status codes",
          "Handle mixed success/failure scenarios appropriately"
        ],
        "relatedCodes": ["200", "424"]
      },
      "208": {
        "name": "Already Reported",
        "description": "The members of a DAV binding have already been enumerated.",
        "whenItOccurs": "In WebDAV to avoid repeatedly enumerating members of multiple bindings",
        "commonCauses": [
          "WebDAV PROPFIND with Depth header",
          "Circular references in WebDAV collections",
          "Optimization for complex WebDAV structures"
        ],
        "howToFix": [
          "This is a normal WebDAV response",
          "Check for duplicate bindings if unexpected",
          "Verify WebDAV collection structure is correct"
        ],
        "relatedCodes": ["207", "200"]
      },
      "226": {
        "name": "IM Used",
        "description": "The server has fulfilled a GET request and the response is a representation of one or more instance-manipulations.",
        "whenItOccurs": "When delta encoding is applied to the response",
        "commonCauses": [
          "Delta encoding for bandwidth optimization",
          "A-IM header in request",
          "Incremental updates to large resources"
        ],
        "howToFix": [
          "This is a success status with delta encoding",
          "Ensure client supports IM (Instance Manipulations)",
          "Verify the delta can be properly applied"
        ],
        "relatedCodes": ["200", "304"]
      }
    }
  },
  "3xx": {
    "name": "Redirection",
    "description": "Further action needs to be taken to complete the request",
    "color": "yellow",
    "codes": {
      "300": {
        "name": "Multiple Choices",
        "description": "The request has more than one possible response. The user or client should choose one.",
        "whenItOccurs": "When multiple representations of a resource are available",
        "commonCauses": [
          "Content negotiation with multiple format options",
          "Multiple language versions available",
          "Different media types for the same resource"
        ],
        "howToFix": [
          "Implement automatic content negotiation based on Accept headers",
          "Provide a default choice with links to alternatives",
          "Use 302/303 with a default selection instead"
        ],
        "relatedCodes": ["301", "302"]
      },
      "301": {
        "name": "Moved Permanently",
        "description": "The URL of the requested resource has been changed permanently. The new URL is given in the response.",
        "whenItOccurs": "When a resource has been permanently moved to a new location",
        "commonCauses": [
          "Website migration to new domain",
          "URL structure changes",
          "Page permanently relocated",
          "HTTPS migration from HTTP"
        ],
        "howToFix": [
          "Update all internal links to use the new URL",
          "Update sitemap and canonical tags",
          "Verify redirect chain doesn't exceed 3-5 hops",
          "Ensure Location header contains the correct new URL",
          "Update third-party links and bookmarks where possible"
        ],
        "relatedCodes": ["302", "308", "410"]
      },
      "302": {
        "name": "Found (Temporary Redirect)",
        "description": "The resource is temporarily located at a different URL. The client should continue using the original URL.",
        "whenItOccurs": "For temporary redirects, such as during maintenance or A/B testing",
        "commonCauses": [
          "Temporary maintenance pages",
          "A/B testing variants",
          "Temporary promotional pages",
          "Short-term URL changes"
        ],
        "howToFix": [
          "Use 301 if the redirect should be permanent",
          "Don't chain multiple 302 redirects",
          "Verify the Location header is correct",
          "Consider using 307 to preserve request method"
        ],
        "relatedCodes": ["301", "303", "307"]
      },
      "303": {
        "name": "See Other",
        "description": "The server sent this response to direct the client to get the requested resource at another URL with a GET request.",
        "whenItOccurs": "After POST/PUT/DELETE to redirect to a result page",
        "commonCauses": [
          "Post-Redirect-Get pattern after form submission",
          "Redirecting after API mutation to a resource URL",
          "Preventing duplicate form submissions on refresh"
        ],
        "howToFix": [
          "This is the correct pattern for POST-redirect-GET",
          "Ensure Location header points to the result resource",
          "Use instead of 302 for POST responses to force GET"
        ],
        "relatedCodes": ["302", "307"]
      },
      "304": {
        "name": "Not Modified",
        "description": "The resource has not been modified since the last request. The client can use the cached version.",
        "whenItOccurs": "When conditional GET requests determine content hasn't changed",
        "commonCauses": [
          "If-Modified-Since header and content unchanged",
          "ETag matching cached version",
          "Browser cache validation"
        ],
        "howToFix": [
          "This is efficient caching behavior - no fix needed",
          "Ensure ETag or Last-Modified headers are sent",
          "Verify cache headers are properly configured",
          "Check If-None-Match or If-Modified-Since logic"
        ],
        "relatedCodes": ["200", "412"]
      },
      "307": {
        "name": "Temporary Redirect",
        "description": "Temporary redirect that preserves the request method and body.",
        "whenItOccurs": "When you need a temporary redirect that maintains the HTTP method",
        "commonCauses": [
          "Temporary redirect where POST should remain POST",
          "Maintenance mode preserving request type",
          "Load balancing or traffic routing"
        ],
        "howToFix": [
          "Use 302 if method can change to GET",
          "Use 308 if redirect should be permanent",
          "Verify Location header is correct",
          "Ensure redirect target accepts the same HTTP method"
        ],
        "relatedCodes": ["302", "303", "308"]
      },
      "308": {
        "name": "Permanent Redirect",
        "description": "Permanent redirect that preserves the request method and body.",
        "whenItOccurs": "When a resource has permanently moved and you need to preserve the request method",
        "commonCauses": [
          "Permanent URL changes requiring POST to stay POST",
          "API endpoint migrations",
          "Permanent domain changes with method preservation"
        ],
        "howToFix": [
          "Update all references to use the new URL",
          "Use 301 if method can change to GET",
          "Update API documentation with new endpoint",
          "Verify Location header is correct"
        ],
        "relatedCodes": ["301", "307"]
      }
    }
  },
  "4xx": {
    "name": "Client Errors",
    "description": "The request contains bad syntax or cannot be fulfilled",
    "color": "orange",
    "codes": {
      "400": {
        "name": "Bad Request",
        "description": "The server cannot process the request due to client error (e.g., malformed syntax, invalid request message framing, or deceptive request routing).",
        "whenItOccurs": "When the request is malformed or contains invalid data",
        "commonCauses": [
          "Malformed JSON or XML in request body",
          "Missing required parameters",
          "Invalid query string syntax",
          "Request body too large",
          "Invalid characters in URL",
          "Corrupted request headers"
        ],
        "howToFix": [
          "Validate request body format (JSON, XML, form data)",
          "Check all required parameters are included",
          "Verify URL encoding is correct",
          "Ensure Content-Type header matches body format",
          "Validate field types and formats match API expectations",
          "Check for any special characters needing encoding",
          "Review API documentation for correct request structure"
        ],
        "relatedCodes": ["422", "413", "414"]
      },
      "401": {
        "name": "Unauthorized",
        "description": "Authentication is required and has failed or has not been provided.",
        "whenItOccurs": "When authentication credentials are missing or invalid",
        "commonCauses": [
          "Missing authentication token or credentials",
          "Expired session or token",
          "Invalid username/password",
          "Token not included in Authorization header",
          "Incorrect authentication scheme (Bearer, Basic, etc.)"
        ],
        "howToFix": [
          "Include authentication credentials in request",
          "Verify token hasn't expired - refresh if needed",
          "Check Authorization header format: 'Bearer TOKEN' or 'Basic BASE64'",
          "Ensure credentials are correct",
          "Clear cookies and re-authenticate",
          "Check if API key is valid and active",
          "Verify authentication endpoint is working"
        ],
        "relatedCodes": ["403", "407"]
      },
      "402": {
        "name": "Payment Required",
        "description": "Reserved for future use. Originally intended for digital payment systems.",
        "whenItOccurs": "When payment is required to access the resource",
        "commonCauses": [
          "Subscription expired or payment method failed",
          "Paywall reached",
          "Account credits depleted",
          "Free tier limits exceeded"
        ],
        "howToFix": [
          "Update payment method",
          "Subscribe to appropriate plan",
          "Add credits to account",
          "Contact billing support",
          "Upgrade account tier"
        ],
        "relatedCodes": ["403", "429"]
      },
      "403": {
        "name": "Forbidden",
        "description": "The client is authenticated but does not have permission to access the resource.",
        "whenItOccurs": "When the user lacks necessary permissions despite being authenticated",
        "commonCauses": [
          "Insufficient user permissions or role",
          "IP address blocked or blacklisted",
          "Resource requires higher access level",
          "Geographic restrictions",
          "Rate limiting or abuse prevention",
          "File permissions issues on server"
        ],
        "howToFix": [
          "Verify user has correct role/permissions",
          "Check IP whitelist/blacklist settings",
          "Review access control lists (ACLs)",
          "Ensure user is in correct user group",
          "Check file/directory permissions on server (chmod)",
          "Verify CORS settings for cross-origin requests",
          "Review firewall or WAF rules",
          "Check if VPN or proxy is causing issues"
        ],
        "relatedCodes": ["401", "405"]
      },
      "404": {
        "name": "Not Found",
        "description": "The server cannot find the requested resource. This is one of the most common error codes.",
        "whenItOccurs": "When the requested URL doesn't exist on the server",
        "commonCauses": [
          "Typo in the URL",
          "Page deleted or moved without redirect",
          "Broken link from another site",
          "Incorrect routing configuration",
          "Resource ID doesn't exist in database",
          "Case sensitivity in URL path"
        ],
        "howToFix": [
          "Verify URL spelling and format",
          "Check if page was moved - implement 301 redirect",
          "Review server routing/rewrite rules",
          "Ensure file exists at specified path",
          "Check web server document root configuration",
          "Verify database record exists for dynamic routes",
          "Implement custom 404 page with helpful navigation",
          "Check .htaccess or nginx config for URL rewrites",
          "Use site search to find correct page"
        ],
        "relatedCodes": ["410", "301", "403"]
      },
      "405": {
        "name": "Method Not Allowed",
        "description": "The HTTP method used is not supported for the requested resource.",
        "whenItOccurs": "When an unsupported HTTP method is used on an endpoint",
        "commonCauses": [
          "Using POST when only GET is allowed",
          "Trying to DELETE a read-only resource",
          "Incorrect HTTP method in API call",
          "Server doesn't support the method for this endpoint"
        ],
        "howToFix": [
          "Check API documentation for allowed methods",
          "Use correct HTTP method (GET, POST, PUT, DELETE, PATCH)",
          "Verify Allow header in response shows permitted methods",
          "Update request to use supported method",
          "Review server route configuration"
        ],
        "relatedCodes": ["400", "501"]
      },
      "406": {
        "name": "Not Acceptable",
        "description": "The server cannot produce a response matching the Accept headers sent by the client.",
        "whenItOccurs": "When content negotiation fails",
        "commonCauses": [
          "Accept header requests unsupported format",
          "Server can't provide requested media type",
          "Language or encoding not available",
          "Quality values exclude all server options"
        ],
        "howToFix": [
          "Check Accept header in request",
          "Request supported format (application/json, text/html, etc.)",
          "Remove or broaden Accept header constraints",
          "Verify server supports requested content type",
          "Check Accept-Language and Accept-Encoding headers"
        ],
        "relatedCodes": ["415", "400"]
      },
      "407": {
        "name": "Proxy Authentication Required",
        "description": "Authentication with the proxy server is required.",
        "whenItOccurs": "When a proxy requires authentication before forwarding the request",
        "commonCauses": [
          "Corporate proxy requiring credentials",
          "Unauthenticated proxy request",
          "Proxy credentials expired",
          "Proxy authentication token missing"
        ],
        "howToFix": [
          "Configure proxy authentication in client/browser",
          "Provide proxy credentials (username/password)",
          "Check Proxy-Authorization header format",
          "Update proxy settings in system/application",
          "Contact network administrator for proxy credentials"
        ],
        "relatedCodes": ["401", "408"]
      },
      "408": {
        "name": "Request Timeout",
        "description": "The server timed out waiting for the request from the client.",
        "whenItOccurs": "When client takes too long to send the complete request",
        "commonCauses": [
          "Slow network connection",
          "Client stalled during upload",
          "Request too large to transmit in time",
          "Network interruption during request",
          "Server timeout configured too low"
        ],
        "howToFix": [
          "Check network connectivity and speed",
          "Reduce request size or split into chunks",
          "Increase server timeout configuration",
          "Retry the request",
          "Ensure client isn't stuck in blocking operation",
          "Use faster connection or reduce payload size"
        ],
        "relatedCodes": ["504", "413"]
      },
      "409": {
        "name": "Conflict",
        "description": "The request conflicts with the current state of the server.",
        "whenItOccurs": "When the request conflicts with existing data or state",
        "commonCauses": [
          "Duplicate record creation (email, username exists)",
          "Version conflict in optimistic locking",
          "Concurrent modification of same resource",
          "Business rule violation",
          "Resource already in requested state"
        ],
        "howToFix": [
          "Check if resource already exists before creating",
          "Implement proper version control/ETags",
          "Handle concurrent modifications with proper locking",
          "Use PUT instead of POST if updating",
          "Refresh data and retry with latest version",
          "Review business logic constraints"
        ],
        "relatedCodes": ["422", "412"]
      },
      "410": {
        "name": "Gone",
        "description": "The resource is no longer available and will not be available again. This is permanent.",
        "whenItOccurs": "When a resource has been permanently deleted",
        "commonCauses": [
          "Content intentionally removed",
          "Account deleted",
          "Expired offer or promotion",
          "Deprecated API endpoint",
          "Archived or purged content"
        ],
        "howToFix": [
          "Remove links to the resource",
          "Update sitemap to exclude deleted pages",
          "Implement 301 redirect to replacement content if available",
          "Show custom page explaining the removal",
          "Update bookmarks and external references"
        ],
        "relatedCodes": ["404", "301"]
      },
      "411": {
        "name": "Length Required",
        "description": "The server requires the Content-Length header to be defined.",
        "whenItOccurs": "When server needs Content-Length but it's missing",
        "commonCauses": [
          "POST/PUT request without Content-Length header",
          "Streaming upload without chunked encoding",
          "Server configuration requiring length"
        ],
        "howToFix": [
          "Add Content-Length header with request body size",
          "Use Transfer-Encoding: chunked for streaming",
          "Ensure HTTP client sets Content-Length automatically",
          "Calculate and include body length in bytes"
        ],
        "relatedCodes": ["400", "413"]
      },
      "412": {
        "name": "Precondition Failed",
        "description": "One or more conditions in the request headers were not met.",
        "whenItOccurs": "When conditional request headers don't match server state",
        "commonCauses": [
          "If-Match header doesn't match ETag",
          "If-Unmodified-Since header condition fails",
          "If-None-Match prevents operation",
          "Resource modified since last read"
        ],
        "howToFix": [
          "Refresh resource to get latest ETag/version",
          "Remove or update conditional headers",
          "Handle concurrent modification properly",
          "Implement retry with latest resource state",
          "Use optimistic locking correctly"
        ],
        "relatedCodes": ["304", "409"]
      },
      "413": {
        "name": "Payload Too Large",
        "description": "The request entity is larger than limits defined by server.",
        "whenItOccurs": "When request body exceeds server limits",
        "commonCauses": [
          "File upload exceeds max size",
          "Large JSON/XML payload",
          "Form data too large",
          "Server upload limit too restrictive"
        ],
        "howToFix": [
          "Reduce request payload size",
          "Split large uploads into chunks",
          "Compress request body",
          "Increase server upload limits (client_max_body_size in nginx)",
          "Use multipart upload for large files",
          "Optimize data structure to reduce size"
        ],
        "relatedCodes": ["400", "414"]
      },
      "414": {
        "name": "URI Too Long",
        "description": "The URI provided was too long for the server to process.",
        "whenItOccurs": "When the URL exceeds server limits (typically 2048-8192 characters)",
        "commonCauses": [
          "Excessive query parameters",
          "Very long URL path",
          "Large data in query string",
          "Too many filter/search parameters"
        ],
        "howToFix": [
          "Use POST with request body instead of GET with query params",
          "Shorten URL by reducing parameters",
          "Use request body for complex queries",
          "Implement pagination to reduce parameters",
          "Store complex queries server-side with ID reference"
        ],
        "relatedCodes": ["400", "413"]
      },
      "415": {
        "name": "Unsupported Media Type",
        "description": "The media format of the requested data is not supported by the server.",
        "whenItOccurs": "When Content-Type is not supported by the endpoint",
        "commonCauses": [
          "Sending JSON to endpoint expecting XML",
          "Wrong Content-Type header",
          "Missing Content-Type header",
          "Unsupported file type in upload"
        ],
        "howToFix": [
          "Set correct Content-Type header (application/json, multipart/form-data, etc.)",
          "Check API documentation for accepted content types",
          "Convert data to supported format",
          "Verify file type is allowed for uploads",
          "Ensure charset is included if needed (application/json; charset=utf-8)"
        ],
        "relatedCodes": ["400", "406"]
      },
      "416": {
        "name": "Range Not Satisfiable",
        "description": "The range specified by the Range header in the request cannot be fulfilled.",
        "whenItOccurs": "When requested byte range is invalid",
        "commonCauses": [
          "Range header exceeds file size",
          "Invalid range format",
          "Start byte > end byte",
          "File modified during range request"
        ],
        "howToFix": [
          "Verify file size before requesting range",
          "Check Range header format: bytes=start-end",
          "Ensure start byte < file size",
          "Request valid range or full file",
          "Check Content-Range in response for valid ranges"
        ],
        "relatedCodes": ["206", "413"]
      },
      "417": {
        "name": "Expectation Failed",
        "description": "The expectation given in the Expect request header could not be met.",
        "whenItOccurs": "When server cannot meet Expect header requirements",
        "commonCauses": [
          "Expect: 100-continue rejected",
          "Server doesn't support expectation",
          "Expect header value not supported"
        ],
        "howToFix": [
          "Remove Expect header if not critical",
          "Send request without waiting for 100-continue",
          "Check server support for Expect headers",
          "Update server configuration to handle expectations"
        ],
        "relatedCodes": ["100", "400"]
      },
      "418": {
        "name": "I'm a Teapot",
        "description": "The server refuses to brew coffee because it is a teapot. This is an April Fools' joke from 1998.",
        "whenItOccurs": "This is a joke status code, but sometimes used by servers to refuse malformed requests",
        "commonCauses": [
          "April Fools' HTTP specification joke",
          "Server configured to return this as Easter egg",
          "Automated attempt to use coffee protocols"
        ],
        "howToFix": [
          "This is intentional - likely an Easter egg",
          "Check if server is configured to return this",
          "Use appropriate endpoint for your request",
          "This may indicate server rejection of automated requests"
        ],
        "relatedCodes": ["400"]
      },
      "421": {
        "name": "Misdirected Request",
        "description": "The request was directed at a server that is not able to produce a response.",
        "whenItOccurs": "When request is sent to server unable to produce response",
        "commonCauses": [
          "HTTP/2 request to wrong server",
          "TLS Server Name Indication mismatch",
          "Proxy routing error",
          "Multi-domain server with incorrect host"
        ],
        "howToFix": [
          "Verify correct server/hostname",
          "Check DNS configuration",
          "Review load balancer/proxy routing",
          "Ensure SNI (Server Name Indication) is correct",
          "Retry request to correct server"
        ],
        "relatedCodes": ["400", "502"]
      },
      "422": {
        "name": "Unprocessable Entity",
        "description": "The request was well-formed but contains semantic errors.",
        "whenItOccurs": "When request syntax is valid but semantic validation fails",
        "commonCauses": [
          "Validation errors (invalid email format, etc.)",
          "Business rule violations",
          "Required field missing or invalid",
          "Data type correct but value invalid",
          "Logical inconsistencies in data"
        ],
        "howToFix": [
          "Check validation error messages in response",
          "Verify all required fields are provided",
          "Ensure data meets format requirements (email, phone, etc.)",
          "Review business logic constraints",
          "Validate data on client before sending",
          "Check for field-specific requirements in API docs"
        ],
        "relatedCodes": ["400", "409"]
      },
      "423": {
        "name": "Locked",
        "description": "The resource being accessed is locked (WebDAV).",
        "whenItOccurs": "When resource is locked and cannot be modified",
        "commonCauses": [
          "File locked for editing by another user (WebDAV)",
          "Resource under exclusive lock",
          "Document checked out in version control"
        ],
        "howToFix": [
          "Wait for lock to be released",
          "Check who has the lock and coordinate",
          "Request lock release from lock owner",
          "Implement proper lock timeout handling",
          "Use WebDAV UNLOCK request if you own the lock"
        ],
        "relatedCodes": ["409", "403"]
      },
      "424": {
        "name": "Failed Dependency",
        "description": "The request failed because it depended on another request that failed (WebDAV).",
        "whenItOccurs": "When multi-operation request has dependencies and one fails",
        "commonCauses": [
          "Dependent operation in batch failed",
          "Previous request in sequence failed",
          "Required resource operation unsuccessful"
        ],
        "howToFix": [
          "Check which dependency failed in response",
          "Fix the failing dependency first",
          "Retry the entire operation sequence",
          "Implement proper transaction handling"
        ],
        "relatedCodes": ["207", "409"]
      },
      "425": {
        "name": "Too Early",
        "description": "Server is unwilling to risk processing a request that might be replayed.",
        "whenItOccurs": "When server detects potential replay attack during TLS",
        "commonCauses": [
          "TLS early data (0-RTT) request",
          "Potential replay attack detection",
          "Non-idempotent request in early data"
        ],
        "howToFix": [
          "Retry request after full TLS handshake",
          "Disable TLS early data for this request",
          "Use idempotent methods (GET) for early data",
          "Wait for connection to be fully established"
        ],
        "relatedCodes": ["400", "503"]
      },
      "426": {
        "name": "Upgrade Required",
        "description": "The server requires the client to upgrade to a different protocol.",
        "whenItOccurs": "When server requires protocol upgrade",
        "commonCauses": [
          "HTTP/1.1 server requiring HTTP/2",
          "Plain HTTP requiring HTTPS",
          "Protocol version too old",
          "WebSocket upgrade needed"
        ],
        "howToFix": [
          "Check Upgrade header in response for required protocol",
          "Update client to support required protocol",
          "Use HTTPS instead of HTTP if indicated",
          "Upgrade HTTP client library version"
        ],
        "relatedCodes": ["101", "505"]
      },
      "428": {
        "name": "Precondition Required",
        "description": "The server requires the request to be conditional.",
        "whenItOccurs": "When server requires conditional headers to prevent conflicts",
        "commonCauses": [
          "Update operation without If-Match header",
          "Missing version/ETag in update request",
          "Server enforcing optimistic locking"
        ],
        "howToFix": [
          "Add If-Match header with current ETag",
          "Include If-Unmodified-Since header",
          "Get current resource version first",
          "Implement proper conditional request handling"
        ],
        "relatedCodes": ["412", "409"]
      },
      "429": {
        "name": "Too Many Requests",
        "description": "The user has sent too many requests in a given amount of time (rate limiting).",
        "whenItOccurs": "When API rate limits are exceeded",
        "commonCauses": [
          "Exceeding API rate limits",
          "Too many requests from same IP",
          "Quota exceeded",
          "Aggressive polling or scraping",
          "DDoS protection triggered"
        ],
        "howToFix": [
          "Check Retry-After header for wait time",
          "Implement exponential backoff for retries",
          "Reduce request frequency",
          "Implement client-side rate limiting",
          "Cache responses to reduce requests",
          "Use webhooks instead of polling",
          "Upgrade to higher rate limit tier",
          "Batch multiple operations into one request"
        ],
        "relatedCodes": ["503", "402"]
      },
      "431": {
        "name": "Request Header Fields Too Large",
        "description": "The server is unwilling to process the request because header fields are too large.",
        "whenItOccurs": "When request headers exceed server limits",
        "commonCauses": [
          "Very large cookies",
          "Excessive custom headers",
          "Long authorization tokens",
          "Large User-Agent string"
        ],
        "howToFix": [
          "Reduce cookie size or number",
          "Remove unnecessary custom headers",
          "Shorten authorization tokens if possible",
          "Increase server header size limits",
          "Split operations if headers contain too much data"
        ],
        "relatedCodes": ["400", "413"]
      },
      "451": {
        "name": "Unavailable For Legal Reasons",
        "description": "The server is denying access to the resource as a consequence of a legal demand.",
        "whenItOccurs": "When content is blocked due to legal requirements",
        "commonCauses": [
          "DMCA takedown notice",
          "Court order blocking content",
          "Geographic censorship",
          "Copyright infringement claim",
          "Government-mandated content blocking"
        ],
        "howToFix": [
          "Respect legal requirements - content is intentionally blocked",
          "Contact site owner for more information",
          "Access from different jurisdiction if legal",
          "Review legal notice in response body",
          "Seek legal counsel if you believe block is erroneous"
        ],
        "relatedCodes": ["403", "410"]
      }
    }
  },
  "5xx": {
    "name": "Server Errors",
    "description": "The server failed to fulfill a valid request",
    "color": "red",
    "codes": {
      "500": {
        "name": "Internal Server Error",
        "description": "The server encountered an unexpected condition that prevented it from fulfilling the request.",
        "whenItOccurs": "When server encounters an unhandled error",
        "commonCauses": [
          "Unhandled exception in server code",
          "Database connection failure",
          "Syntax error in server-side code",
          "Missing configuration",
          "Insufficient server resources (memory, disk)",
          "Third-party service failure",
          "File permission issues"
        ],
        "howToFix": [
          "Check server error logs for specific error details",
          "Review recent code deployments for bugs",
          "Verify database is accessible and responsive",
          "Check server resource usage (CPU, memory, disk)",
          "Verify file permissions on server",
          "Test third-party API integrations",
          "Enable debug mode to get detailed error messages",
          "Check for syntax errors in configuration files",
          "Restart application server if needed"
        ],
        "relatedCodes": ["502", "503"]
      },
      "501": {
        "name": "Not Implemented",
        "description": "The server does not support the functionality required to fulfill the request.",
        "whenItOccurs": "When server doesn't support the requested feature",
        "commonCauses": [
          "Unsupported HTTP method (e.g., TRACE, CONNECT)",
          "Feature not yet implemented",
          "Deprecated functionality removed",
          "Server doesn't recognize request method"
        ],
        "howToFix": [
          "Use supported HTTP methods only",
          "Check if feature is available in newer server version",
          "Review API documentation for available features",
          "Use alternative endpoint or method",
          "Contact API provider about feature availability"
        ],
        "relatedCodes": ["405", "505"]
      },
      "502": {
        "name": "Bad Gateway",
        "description": "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
        "whenItOccurs": "When proxy/load balancer gets invalid response from backend",
        "commonCauses": [
          "Backend server down or unreachable",
          "Backend server returning malformed response",
          "Network issue between proxy and backend",
          "Backend server timeout",
          "DNS resolution failure for backend",
          "Firewall blocking backend connection"
        ],
        "howToFix": [
          "Check if backend application server is running",
          "Verify network connectivity to backend",
          "Check backend server logs for errors",
          "Ensure backend server is not overloaded",
          "Verify proxy/load balancer configuration",
          "Check DNS resolution for backend hostname",
          "Review firewall rules between proxy and backend",
          "Increase backend server timeout if needed",
          "Restart backend application or proxy server"
        ],
        "relatedCodes": ["500", "503", "504"]
      },
      "503": {
        "name": "Service Unavailable",
        "description": "The server is not ready to handle the request, usually due to maintenance or overload.",
        "whenItOccurs": "When server is temporarily unable to handle requests",
        "commonCauses": [
          "Server maintenance window",
          "Server overloaded with requests",
          "Database connections exhausted",
          "Application deployment in progress",
          "Resource limits reached",
          "Intentional rate limiting",
          "Circuit breaker triggered"
        ],
        "howToFix": [
          "Wait and retry - check Retry-After header",
          "Implement exponential backoff for retries",
          "Check if scheduled maintenance is in progress",
          "Scale server resources (CPU, memory, connections)",
          "Optimize slow queries and resource usage",
          "Implement caching to reduce server load",
          "Use load balancing to distribute traffic",
          "Enable auto-scaling if using cloud infrastructure",
          "Review application resource consumption"
        ],
        "relatedCodes": ["500", "502", "429"]
      },
      "504": {
        "name": "Gateway Timeout",
        "description": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
        "whenItOccurs": "When proxy/gateway times out waiting for backend response",
        "commonCauses": [
          "Backend server taking too long to respond",
          "Slow database query",
          "Long-running process not completing",
          "Network latency issues",
          "Backend server deadlock or infinite loop",
          "Insufficient backend server resources"
        ],
        "howToFix": [
          "Optimize slow backend operations",
          "Increase gateway timeout settings",
          "Add database query indexes",
          "Move long operations to background jobs",
          "Scale backend resources",
          "Implement query timeout limits",
          "Use caching for expensive operations",
          "Review and optimize code performance",
          "Check for N+1 query problems",
          "Monitor backend server performance"
        ],
        "relatedCodes": ["502", "408", "503"]
      },
      "505": {
        "name": "HTTP Version Not Supported",
        "description": "The server does not support the HTTP protocol version used in the request.",
        "whenItOccurs": "When HTTP version in request is not supported",
        "commonCauses": [
          "Using HTTP/2 or HTTP/3 with HTTP/1.1-only server",
          "Very old HTTP version (HTTP/0.9)",
          "Misconfigured client HTTP version",
          "Server doesn't support requested protocol"
        ],
        "howToFix": [
          "Use HTTP/1.1 as most widely supported",
          "Update server to support newer HTTP versions",
          "Check client HTTP configuration",
          "Verify server protocol support",
          "Enable HTTP/2 or HTTP/3 on server if needed"
        ],
        "relatedCodes": ["426", "400"]
      },
      "506": {
        "name": "Variant Also Negotiates",
        "description": "The server has an internal configuration error with content negotiation.",
        "whenItOccurs": "When transparent content negotiation has circular reference",
        "commonCauses": [
          "Server misconfiguration in content negotiation",
          "Circular reference in variant selection",
          "TCN (Transparent Content Negotiation) error"
        ],
        "howToFix": [
          "Fix server content negotiation configuration",
          "Review TCN setup for circular references",
          "Contact server administrator",
          "Check Apache or Nginx content negotiation config"
        ],
        "relatedCodes": ["500", "300"]
      },
      "507": {
        "name": "Insufficient Storage",
        "description": "The server is unable to store the representation needed to complete the request (WebDAV).",
        "whenItOccurs": "When server runs out of storage space",
        "commonCauses": [
          "Disk space full",
          "Quota exceeded",
          "Upload would exceed available storage",
          "Temporary directory full"
        ],
        "howToFix": [
          "Free up disk space on server",
          "Increase storage capacity",
          "Clean up temporary files",
          "Adjust quota limits",
          "Delete old or unnecessary files",
          "Implement storage monitoring and alerts"
        ],
        "relatedCodes": ["413", "500"]
      },
      "508": {
        "name": "Loop Detected",
        "description": "The server detected an infinite loop while processing the request (WebDAV).",
        "whenItOccurs": "When server detects infinite loop in request processing",
        "commonCauses": [
          "Circular symbolic links",
          "Infinite redirect loop",
          "Circular reference in WebDAV binding",
          "Recursive processing error"
        ],
        "howToFix": [
          "Check for circular symbolic links on server",
          "Review redirect configuration for loops",
          "Fix circular references in WebDAV structure",
          "Implement loop detection in application logic",
          "Review server configuration for recursive includes"
        ],
        "relatedCodes": ["500", "310"]
      },
      "510": {
        "name": "Not Extended",
        "description": "Further extensions to the request are required for the server to fulfill it.",
        "whenItOccurs": "When server requires extension that client hasn't provided",
        "commonCauses": [
          "Required protocol extension not used",
          "Missing mandatory HTTP extension",
          "Extension framework not properly implemented"
        ],
        "howToFix": [
          "Check what extension server requires",
          "Implement required HTTP extension",
          "Review server extension requirements",
          "Update client to support required extensions"
        ],
        "relatedCodes": ["426", "501"]
      },
      "511": {
        "name": "Network Authentication Required",
        "description": "The client needs to authenticate to gain network access (captive portal).",
        "whenItOccurs": "When accessing internet requires authentication (WiFi portal, etc.)",
        "commonCauses": [
          "Public WiFi requiring login",
          "Hotel or airport captive portal",
          "Corporate network authentication",
          "ISP login requirement"
        ],
        "howToFix": [
          "Open browser to complete captive portal login",
          "Authenticate with WiFi network",
          "Accept terms and conditions if required",
          "Enter credentials for network access",
          "Contact network administrator if unable to authenticate"
        ],
        "relatedCodes": ["401", "407"]
      },
      "520": {
        "name": "Web Server Returned Unknown Error",
        "description": "Cloudflare received an empty, unknown, or unexpected response from the origin server.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When Cloudflare cannot interpret the response from your origin server",
        "commonCauses": [
          "Origin server crashed or returned empty response",
          "Connection reset by origin server",
          "Response headers exceed Cloudflare limits (16KB)",
          "Origin server returning invalid HTTP response",
          "Application error causing malformed response"
        ],
        "howToFix": [
          "Check origin server error logs for crashes",
          "Ensure origin server is running and healthy",
          "Verify response headers don't exceed 16KB",
          "Test direct connection to origin (bypass Cloudflare)",
          "Check for infinite loops or application errors",
          "Review server resource limits (memory, connections)"
        ],
        "relatedCodes": ["521", "522", "500"]
      },
      "521": {
        "name": "Web Server Is Down",
        "description": "The origin web server refused the connection from Cloudflare.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When Cloudflare cannot establish a TCP connection to your origin",
        "commonCauses": [
          "Origin web server is down or stopped",
          "Firewall blocking Cloudflare IP addresses",
          "Origin server overloaded and refusing connections",
          "Wrong origin IP configured in Cloudflare DNS",
          "Web server not listening on expected port (80/443)"
        ],
        "howToFix": [
          "Verify origin web server is running (systemctl status nginx)",
          "Whitelist all Cloudflare IP ranges in firewall",
          "Check origin server is listening on correct ports",
          "Verify DNS A record points to correct origin IP",
          "Check for rate limiting blocking Cloudflare requests",
          "Test: curl -I http://your-origin-ip directly"
        ],
        "relatedCodes": ["520", "522", "503"]
      },
      "522": {
        "name": "Connection Timed Out",
        "description": "Cloudflare could not complete a TCP handshake with the origin server.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When the origin server takes too long to respond to Cloudflare's connection attempt",
        "commonCauses": [
          "Origin server overloaded with requests",
          "Network congestion between Cloudflare and origin",
          "Firewall silently dropping packets (not rejecting)",
          "Origin server in different geographic region (high latency)",
          "TCP SYN packets being blocked or dropped"
        ],
        "howToFix": [
          "Check origin server CPU/memory usage",
          "Ensure firewall ALLOWs (not just doesn't block) Cloudflare IPs",
          "Increase server connection limits and timeouts",
          "Consider using Cloudflare Argo for faster routing",
          "Check hosting provider for network issues",
          "Reduce origin server geographic distance if possible"
        ],
        "relatedCodes": ["521", "524", "504"]
      },
      "523": {
        "name": "Origin Is Unreachable",
        "description": "Cloudflare could not reach the origin server, likely due to DNS or routing issues.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When Cloudflare cannot resolve or route to your origin IP address",
        "commonCauses": [
          "DNS records pointing to invalid or unreachable IP",
          "Origin IP address has changed but DNS not updated",
          "Origin server's IP is blackholed or unreachable",
          "Routing issues between Cloudflare and origin network",
          "Origin is on a private/internal IP (not publicly routable)"
        ],
        "howToFix": [
          "Verify DNS A/AAAA records point to correct origin IP",
          "Ensure origin IP is publicly accessible",
          "Test origin accessibility: ping your-origin-ip",
          "Check with hosting provider for routing issues",
          "Verify origin isn't using internal/private IP ranges",
          "Update Cloudflare DNS if origin IP changed"
        ],
        "relatedCodes": ["521", "522", "502"]
      },
      "524": {
        "name": "A Timeout Occurred",
        "description": "Cloudflare established a TCP connection but the origin didn't respond with an HTTP response in time.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When origin server takes longer than 100 seconds to send HTTP headers",
        "commonCauses": [
          "Long-running scripts or database queries",
          "Origin server processing complex operations",
          "PHP/Node.js script timing out",
          "Database connection pool exhaustion",
          "Deadlocks or infinite loops in application code"
        ],
        "howToFix": [
          "Optimize slow database queries",
          "Implement background job processing for long tasks",
          "Increase PHP/application max_execution_time",
          "Use Cloudflare Enterprise for extended timeouts",
          "Add caching to reduce origin processing time",
          "Consider breaking long operations into smaller chunks",
          "Monitor and fix application performance issues"
        ],
        "relatedCodes": ["522", "504", "408"]
      },
      "525": {
        "name": "SSL Handshake Failed",
        "description": "Cloudflare could not complete an SSL/TLS handshake with the origin server.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When using Full or Full (Strict) SSL mode and origin SSL is misconfigured",
        "commonCauses": [
          "Expired SSL certificate on origin server",
          "Self-signed certificate (with Full Strict mode)",
          "SSL/TLS version mismatch",
          "Origin not serving SSL on port 443",
          "Cipher suite incompatibility",
          "Missing intermediate certificates"
        ],
        "howToFix": [
          "Verify origin SSL certificate is valid and not expired",
          "Install Cloudflare Origin CA certificate (free)",
          "Ensure full certificate chain is installed",
          "Check origin server SSL configuration (ssl-labs.com)",
          "Temporarily test with 'Flexible' SSL mode",
          "Update origin server TLS to 1.2 or higher"
        ],
        "relatedCodes": ["526", "502"]
      },
      "526": {
        "name": "Invalid SSL Certificate",
        "description": "Cloudflare could not validate the SSL certificate on the origin server.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When using Full (Strict) SSL mode and origin certificate is untrusted",
        "commonCauses": [
          "Self-signed SSL certificate on origin",
          "Origin certificate not signed by trusted CA",
          "Certificate hostname mismatch",
          "Expired origin SSL certificate",
          "Missing or incorrect certificate chain"
        ],
        "howToFix": [
          "Install a valid SSL certificate from trusted CA",
          "Use Cloudflare Origin CA certificate (trusted by Cloudflare)",
          "Switch to 'Full' SSL mode (less strict) temporarily",
          "Ensure certificate matches your domain name",
          "Renew expired certificate",
          "Install complete certificate chain including intermediates"
        ],
        "relatedCodes": ["525", "502"]
      },
      "527": {
        "name": "Railgun Error",
        "description": "Connection issues between Cloudflare and the Railgun server.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When Cloudflare Railgun (legacy optimization) encounters connection issues",
        "commonCauses": [
          "Railgun Listener not running on origin",
          "Firewall blocking Railgun port (2408)",
          "Railgun token mismatch",
          "Network connectivity issues to Railgun server"
        ],
        "howToFix": [
          "Verify Railgun Listener is running",
          "Check Railgun configuration and tokens",
          "Open port 2408 in firewall",
          "Consider disabling Railgun (deprecated feature)",
          "Contact Cloudflare support for Railgun issues"
        ],
        "relatedCodes": ["520", "522"]
      },
      "530": {
        "name": "Origin DNS Error",
        "description": "Error 530 is returned alongside a 1XXX error from Cloudflare.",
        "vendor": "Cloudflare",
        "whenItOccurs": "When there's a DNS resolution issue combined with other Cloudflare errors",
        "commonCauses": [
          "Site frozen or suspended by hosting provider",
          "DNS configuration error",
          "Domain suspended or expired",
          "Accompanying 1XXX Cloudflare error"
        ],
        "howToFix": [
          "Check for accompanying 1XXX error code for details",
          "Verify domain registration is active",
          "Check DNS records in Cloudflare dashboard",
          "Contact hosting provider if site is frozen",
          "Review Cloudflare community for 1XXX error solutions"
        ],
        "relatedCodes": ["523", "521"]
      },
      "499": {
        "name": "Client Closed Request",
        "description": "The client closed the connection before the server could send a response.",
        "vendor": "Nginx",
        "whenItOccurs": "When a client (browser, app) terminates the request early",
        "commonCauses": [
          "User clicked away or closed browser before response",
          "Client-side timeout exceeded",
          "Mobile network connection dropped",
          "Slow server response causing client to give up",
          "Load balancer health check timeout"
        ],
        "howToFix": [
          "Optimize server response times",
          "Increase client-side timeout settings",
          "Improve network reliability",
          "Usually not a server-side issue to fix",
          "Monitor frequency - high rates indicate slow responses"
        ],
        "relatedCodes": ["408", "504"]
      }
    }
  }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = statusCodesData;
}
