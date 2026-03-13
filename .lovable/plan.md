

## Plan

### 1. Fix build error in `src/i18n.ts`
Replace `process.env.NODE_ENV === 'development'` with `import.meta.env.DEV` (Vite's equivalent).

### 2. Generate OpenAPI 3.0 YAML specification
Create `doc/GatherToPlay_OpenAPI.yaml` based on the existing API specification markdown, covering all 33 endpoints with full request/response schemas. This can be used to auto-generate backend controllers and client SDKs.

The OpenAPI spec will include:
- OpenAPI 3.0.3 format
- All endpoints from the API specification (Auth, Events, Groups, Fields, Players)
- Component schemas for all request/response types
- Security schemes (Bearer JWT + API Key)
- Standard error responses

