---
layout: insure-page
title: Pixels to Proofs — selfdriven.insure
description: Pixels → Proofs for property insurance — COPE, regulation and verifiable credentials.
permalink: /research/pixels-to-proofs-insurance
crumb: Pixels to Proofs
next_url: /research/pixels-to-proofs-insurance-apra
next_title: Board, AFCA &amp; standards version
---

# Pixels → Proofs for <em>property insurance</em>

COPE, regulation, and verifiable credentials.

## 1. Mapping Pixels → Proofs to COPE underwriting

COPE already describes **what matters**. Proofs describe **how it's verified**.

### C — Construction

**Traditional (pixels & assertions):**

- Builder declarations
- PDFs of compliance certificates
- Photos of materials
- Age inferred from documents

**Proof-based underwriting:**

- Building DID issued at construction
- Construction VC signed by:
  - Licensed builder
  - Certifier / surveyor
- Claims include:
  - Material type (brick, concrete, timber)
  - Fire resistance rating
  - Year built / last major renovation
  - Australian Standards references

> **Result:** construction risk becomes verifiable state, not self-report.

### O — Occupancy

**Traditional:**

- Proposal form checkboxes
- Annual declarations
- Claims-time discovery

**Proof-based:**

- Occupancy VC issued by:
  - Owner
  - Property manager
  - Registered operator (e.g. aged care)
- Time-bound credentials:
  - Residential
  - Commercial
  - Mixed-use
  - Vacant
- Updated automatically on change

> **Result:** occupancy risk is continuously verified, not periodically guessed.

### P — Protection

**Traditional:**

- Photos of alarms and sprinklers
- Invoices
- Trust-based declarations

**Proof-based:**

- Protection VCs issued by:
  - Fire services
  - Alarm installers
  - IoT providers
- Includes:
  - Alarm type
  - Monitoring status
  - Maintenance validity
  - Last test timestamp

> **Result:** protection becomes active assurance, not static evidence.

### E — Exposure

**Traditional:**

- Postcode-level catastrophe models
- Static flood maps
- Manual peril overlays

**Proof-based:**

- Exposure proofs derived from:
  - Geospatial hazard registries
  - Weather oracle attestations
  - Council zoning credentials
- Anchored at underwriting time
- Re-verified dynamically

> **Result:** exposure becomes explainable, auditable, and contestable.

### COPE summary

| COPE | Pixel world | Proof world |
|---|---|---|
| Construction | PDFs, photos | Builder & certifier VCs |
| Occupancy | Declarations | Time-bound occupancy VCs |
| Protection | Images & invoices | Installer & IoT proofs |
| Exposure | Static models | Verifiable hazard attestations |

## 2. Regulator-facing explainer

Why proof-based insurance improves consumer protection.

**Audience:** regulators, prudential bodies, policy makers.

### The problem regulators face

- Increasing fraud via synthetic documents
- Growing opacity in AI-driven decisions
- Manual audits that don't scale
- Data retention and privacy risk
- Disputes over evidence authenticity

Visual evidence is no longer reliable in an AI world.

### The shift: from documents to verifiable claims

A proof-based insurance system replaces:

- Trust in documents
- Trust in platforms
- Trust in internal processes

With:

- Trust in cryptographic verification
- Independent issuer accountability
- Deterministic decision logic

### What changes for the regulator

- Every underwriting decision is reproducible
- Every claim decision is auditable
- Every proof has a known issuer
- Every verification step is logged
- No reliance on opaque AI judgement

AI assists — but never invents evidence.

### Consumer protection benefits

- Fewer disputes ("show me the proof")
- Faster claims settlement
- Reduced data exposure
- Clear appeal paths
- Portable credentials across insurers

### Regulatory alignment

Proof-based insurance directly supports:

- Risk-based supervision
- Model transparency
- Data minimisation
- Accountability of decision-makers
- Cross-border interoperability

> This is not deregulation — it is **stronger enforcement by design**.

## 3. Verifiable credential schemas

### 3.1 Property DID (root identity)

```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "PropertyIdentity"],
  "issuer": "did:web:landregistry.gov.au",
  "credentialSubject": {
    "id": "did:property:au:nsw:lot12345",
    "address": {
      "street": "123 Example St",
      "city": "Sydney",
      "state": "NSW",
      "postcode": "2000",
      "country": "AU"
    }
  }
}
```

### 3.2 Construction VC

```json
{
  "type": ["VerifiableCredential", "ConstructionCredential"],
  "issuer": "did:web:licensedbuilder.example",
  "credentialSubject": {
    "id": "did:property:au:nsw:lot12345",
    "constructionType": "brick",
    "roofType": "metal",
    "fireResistanceRating": "FRL 60/60/60",
    "yearBuilt": 2015,
    "standards": ["AS 3959", "NCC 2019"]
  }
}
```

### 3.3 Occupancy VC

```json
{
  "type": ["VerifiableCredential", "OccupancyCredential"],
  "issuer": "did:web:propertymanager.example",
  "credentialSubject": {
    "id": "did:property:au:nsw:lot12345",
    "occupancyType": "residential-owner-occupied",
    "maxOccupants": 4
  },
  "expirationDate": "2026-06-30T00:00:00Z"
}
```

### 3.4 Protection VC

```json
{
  "type": ["VerifiableCredential", "FireProtectionCredential"],
  "issuer": "did:web:fireinstaller.example",
  "credentialSubject": {
    "id": "did:property:au:nsw:lot12345",
    "smokeAlarms": true,
    "sprinklerSystem": false,
    "lastInspection": "2025-02-01",
    "monitoring": "24x7"
  }
}
```

### 3.5 Claim event proof (weather)

```json
{
  "type": ["VerifiableCredential", "WeatherEventCredential"],
  "issuer": "did:web:meteo.example",
  "credentialSubject": {
    "location": "did:property:au:nsw:lot12345",
    "eventType": "hail",
    "severity": "severe",
    "eventWindow": {
      "from": "2025-03-10T12:00:00Z",
      "to": "2025-03-10T14:00:00Z"
    }
  }
}
```

> COPE describes risk. Proofs verify it. Automation settles it.
