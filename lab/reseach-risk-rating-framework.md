# selfdriven.insure
# Dynamic Risk & Resilience Rating Framework (DR²)

**Technical Architecture, Risk Methodology & Validation Specification**

**Version:** 0.1 — Foundational Draft  
**Date:** 23 October 2026  
**Status:** Proposed / Research & Development  
**Initial domain:** Commercial property insurance  
**Extension domains:** Residential property, motor, cyber, agriculture, business interruption and infrastructure

---

## 1. Executive Summary

Traditional insurance underwriting relies on relatively static assessments of risk characteristics, historical claims and periodic reassessments.

For property insurance, the established COPE framework — Construction, Occupancy, Protection and Exposure — provides a useful foundation for describing risk.

However, COPE alone does not prescribe how an insurer should model the changing condition of an asset, the effectiveness of risk controls, resilience, recovery capability or the reliability of supporting evidence.

The Dynamic Risk & Resilience Rating Framework (DR²) extends traditional insurance assessment through a modular, evidence-driven architecture.

The framework is designed to:

1. Preserve established underwriting concepts, including COPE.
2. Evaluate inherent and residual risk by individual peril.
3. Separate observed risk characteristics from the evidence supporting them.
4. Incorporate prevention, resilience and recovery capabilities.
5. Track changes in risk over time.
6. Support explainable, independently verifiable risk assessments.
7. Enable insurers to calibrate technical premiums against real loss experience.
8. Provide insured parties with actionable risk-improvement pathways.

**Fundamental principle:**

> Risk should be assessed as a verifiable, evolving state rather than a static classification.

The framework separates six concepts that must not be conflated:

- **Risk:** Expected adverse outcomes and their severity.
- **Mitigation:** Demonstrable reduction in risk.
- **Evidence:** Basis for believing particular assertions.
- **Uncertainty:** What remains unknown about risk.
- **Resilience:** Capacity to withstand and recover from adverse events.
- **Insurability:** Whether a risk is sufficiently understood and bounded to offer sustainable insurance.

These concepts remain separately represented even when summarised into customer-facing ratings.

---

## 2. Scope and Objectives

### 2.1 Initial scope

Version 0.1 shall focus on commercial property insurance with the following initial perils:

- Fire
- Flood
- Storm and wind
- Theft and malicious damage
- Escape of water

Business interruption may be introduced subsequently, with explicit modelling of physical-damage dependencies and policy terms.

### 2.2 Out of scope for v0.1

- Fully autonomous binding of insurance cover
- Automatic premium changes based solely on telemetry
- Production actuarial approval
- Automated rejection of insurance applications
- Cross-line portfolio capital optimisation
- Claims adjudication

### 2.3 Core design requirements

The system SHALL:

- Separate source data from inferred attributes and model outputs.
- Retain original COPE classifications.
- Associate assessments with a defined asset, location, peril and effective date.
- Preserve model versions and calculation provenance.
- Represent missing, disputed and stale evidence explicitly.
- Support independent recalculation of deterministic ratings.
- Support human review and overrides with recorded justification.
- Distinguish estimated losses from presentation scores.
- Allow risk models and calibration datasets to be replaced without changing the canonical asset model.

The system SHOULD:

- Accept periodic and event-driven evidence updates.
- Generate explainable mitigation recommendations.
- Support privacy-preserving verification.
- Interoperate with insurer-specific underwriting rules and taxonomies.
- Support signed evidence and independently reproducible assessments.

---

## 3. Conceptual Architecture

The architecture consists of seven layers.

| Layer | Purpose |
|---|---|
| 1. Risk Object | Identifies the asset, location, entity, coverage and insured value |
| 2. COPE Profile | Defines foundational physical and operational characteristics |
| 3. Evidence Graph | Records claims, sources, verification, validity and provenance |
| 4. Peril Models | Estimates frequency, severity and risk drivers for each peril |
| 5. Mitigation & Resilience | Models control effectiveness, condition and recovery |
| 6. Rating Engine | Produces technical risk estimates, uncertainty and presentation scores |
| 7. Underwriting Interface | Supports eligibility, referrals, decisions, recommendations and pricing integrations |

A change in evidence may trigger reassessment, but it does not automatically justify a premium or coverage change.

---

## 4. COPE Data Model

COPE remains a canonical grouping for property risk characteristics.

### 4.1 Construction

Properties include:

- Primary structural materials
- Construction date and relevant modifications
- Roof construction and condition
- Building height and floor area
- Fire compartmentation
- Structural characteristics
- Relevant engineering certifications
- Replacement cost

### 4.2 Occupancy

Properties include:

- Primary and secondary occupancy types
- Business activities
- Combustible and hazardous materials
- Operational hours
- Storage arrangements
- Occupancy density
- Maintenance activities
- Changes in use

### 4.3 Protection

Properties include:

- Fire detection
- Automatic fire suppression
- Security systems
- Emergency response access
- Physical access controls
- Preventive maintenance
- Inspection and certification
- Water leak detection and isolation

Protection systems must be assessed for operational condition, not merely recorded as present or absent.

### 4.4 Exposure

Properties include:

- Geographic hazards
- Nearby properties and activities
- Flood exposure
- Bushfire exposure
- Wind and storm exposure
- External fire hazards
- Physical access and infrastructure dependencies
- Accumulation and catastrophe exposure

The model must distinguish external hazard, insured value exposed, vulnerability and financial consequences.

---

## 5. Risk Taxonomy

DR² extends COPE using eight analytical dimensions.

| Dimension | Definition |
|---|---|
| Exposure | Nature and magnitude of the assets and activities subject to adverse events |
| Behaviour | Observable operating practices materially associated with loss |
| Condition | Current physical or operational state |
| Controls | Measures preventing or limiting adverse outcomes |
| Resilience | Capacity to withstand disruption while retaining essential function |
| Recovery | Ability to restore operations and replace damaged assets |
| Context | External environmental and systemic conditions |
| Evidence | Quality and coverage of the information supporting the assessment |

Evidence is an assessment-quality dimension, not a physical peril or loss mitigation mechanism.

The eight dimensions constitute a descriptive framework. They are not assumed to be statistically independent.

No universal weighting across all dimensions shall be adopted without empirical validation.

---

## 6. Peril-Specific Risk Model

### 6.1 Primary unit of assessment

The principal risk object is:

**Asset × Peril × Coverage × Evaluation Period**

For each risk object, the engine estimates a probability distribution of insured loss.

Define:

- \(a\): asset
- \(p\): peril
- \(t\): evaluation period
- \(x\): relevant observed attributes
- \(c\): verified control state
- \(L\): insured loss amount

The objective is to estimate:

**P(L | a, p, t, x, c)**

The engine must retain the distinction between the underlying hazard event, physical damage and loss payable under insurance terms.

### 6.2 Expected annual loss

For an initial frequency-severity model:

**EAL = λ × μ**

Where:

- λ = expected annual claim frequency
- μ = expected insured claim severity, conditional on a claim
- EAL = expected annual insured loss

A more complete model may use event simulation, catastrophe scenarios and aggregate annual loss distributions.

### 6.3 Inherent risk

Inherent risk represents a defined reference condition before the specified mitigation measures are applied.

This reference condition must be explicitly defined, as removing all controls is not always physically meaningful.

### 6.4 Residual risk

Residual risk represents the loss distribution after relevant mitigation and recovery capabilities are taken into account.

For a simple exploratory model:

**Residual EAL = Reference EAL × (1 − M)**

Where M represents the estimated fractional loss reduction from explicitly modelled controls.

This equation is only valid where the mitigation factor is calibrated against the same reference basis and outcome.

Production models should separately evaluate whether controls affect:

- Event or claim frequency
- Damage probability
- Damage severity
- Loss duration
- Recovery cost

Independent controls must not be assumed to have additive benefits.

### 6.5 Multiple perils

Portfolio expected loss may be estimated by summing expected losses across mutually defined coverage/peril components, provided overlaps and double-counting are resolved.

Aggregate volatility, tail risk and capital requirements require joint distributions that account for correlations and common catastrophic events.

---

## 7. Evidence & Verification Model

### 7.1 Evidence object

Every material underwriting assertion should be supported by a structured evidence record.

Required fields:

| Field | Description |
|---|---|
| evidence_id | Immutable evidence identifier |
| subject_id | Asset, system or entity |
| predicate | Attribute or assertion being supported |
| value | Claimed value |
| observed_at | Time the fact was observed |
| recorded_at | Time ingested |
| valid_from / valid_to | Period of asserted validity |
| issuer | Originating organisation or device |
| collection_method | Inspection, sensor, API, document or declaration |
| verification_method | Method used to establish authenticity or reliability |
| verification_status | Verified, unverified, disputed, expired or revoked |
| content_hash | Digest of canonical evidence payload |
| signature | Optional digital signature or verification reference |
| provenance | Supporting evidence lineage |
| policy_reference | Applicable verification policy |

### 7.2 Evidence confidence

Evidence confidence is not equivalent to risk safety.

The framework shall assess evidence across:

- Authenticity
- Relevance
- Freshness
- Completeness
- Coverage
- Independence
- Consistency
- Verification quality

An illustrative composite indicator may be presented on a 0–100 scale.

However, confidence aggregation should account for correlated sources. Multiple documents originating from the same underlying assertion do not necessarily provide independent corroboration.

### 7.3 Missing evidence

Missing evidence shall be represented explicitly.

It may trigger:

- An uncertainty interval
- A request for further inspection
- A provisional rating
- A manual underwriting referral
- A conservative treatment where justified by calibrated underwriting policy

Missing evidence must not automatically be treated as proof that a control is absent or defective.

### 7.4 Verified Context Graphs

The framework may use a Verified Context Graph (VCG) to model relationships among:

**Assets → Assertions → Evidence → Controls → Perils → Loss Models → Ratings**

The graph supports traceability, not automatic proof that a rating is actuarially correct.

Three forms of verification must remain distinct:

1. **Evidence verification:** Is an assertion authentic and supported?
2. **Computational verification:** Was the specified rating model executed correctly?
3. **Predictive validation:** Does the model estimate real-world outcomes accurately?

Cryptographic proof of source integrity satisfies neither predictive validation nor control effectiveness by itself.

---

## 8. Risk Trajectory

The system shall retain historical assessment snapshots and support temporal analysis.

Measures include:

- Current risk estimate
- Change over a defined period
- Rate of change
- Observed variability
- Confidence in changes
- Materiality of emerging changes

Example:

An improved fire suppression system may reduce estimated fire severity after inspection and verification.

A deteriorating roof condition may increase storm vulnerability.

Trajectory must be calculated on a comparable model basis. A model version change must not be mistaken for a change in the underlying risk.

Historical scores should be recomputed or explicitly separated when model calibration changes.

---

## 9. Resilience & Recovery

Resilience is assessed as the ability to withstand adverse events while maintaining essential capabilities.

Recovery measures include:

- Time to restore
- Repair and replacement lead time
- Availability of contractors
- Replacement part availability
- Financial capacity
- Emergency plans
- Business continuity arrangements
- Testing history

Where applicable, resilience and recovery are integrated into the loss model.

For example, restoration time may affect business interruption losses, but should not automatically influence direct property damage frequency.

The system shall avoid counting a resilience benefit twice through both the loss model and a separate rating discount.

---

## 10. Insurability Assessment

Insurability is separate from expected loss.

It measures whether a risk can be assessed, bounded and transferred within an insurer's requirements.

Four proposed components:

1. **Observability:** Availability of decision-relevant information.
2. **Predictability:** Reliability of estimates and uncertainty bounds.
3. **Controllability:** Availability and effectiveness of relevant mitigation.
4. **Recoverability:** Ability to restore operations and manage loss consequences.

Insurability should be represented as a multidimensional assessment, with an optional summary indicator.

The final underwriting determination additionally depends on:

- Insurer risk appetite
- Available capacity
- Policy terms and exclusions
- Portfolio concentration
- Reinsurance arrangements
- Regulatory and commercial constraints

A higher insurability indicator does not guarantee an offer of insurance.

---

## 11. Rating Outputs

DR² shall produce four headline outputs.

### 11.1 Risk Rating

A 0–100 customer-facing indicator, where a higher value represents lower estimated risk relative to a defined benchmark.

Proposed presentation bands:

| Grade | Score |
|---|---:|
| A+ | 90–100 |
| A | 80–89 |
| B | 70–79 |
| C | 60–69 |
| D | 45–59 |
| E | 30–44 |
| F | 0–29 |

These bands are provisional presentation conventions.

They shall not be used as claims about calibrated risk until validated against the relevant insurance population.

### 11.2 Evidence Rating

Quality and completeness of evidence supporting the assessment.

### 11.3 Risk Trajectory

Improving, stable, deteriorating or indeterminate, with associated measurement intervals.

### 11.4 Insurability Rating

An assessment of the practical feasibility of underwriting and transferring the risk.

A risk score must never replace the expected-loss estimates or uncertainty distribution needed for technical pricing.

---

## 12. Reference Data Schema

The following JSON is an illustrative assessment object, not a completed JSON Schema.

```json
{
  "schema_version": "0.1",
  "assessment_id": "dr2-assessment-001",
  "asset_id": "property-001",
  "as_of": "2026-10-23T00:00:00Z",
  "period": {
    "start": "2026-11-01",
    "end": "2027-10-31"
  },
  "cope": {
    "construction": {},
    "occupancy": {},
    "protection": {},
    "exposure": {}
  },
  "perils": [
    {
      "id": "fire",
      "coverage": "property_damage",
      "model_version": "fire-0.1",
      "annual_frequency": 0.02,
      "mean_claim_severity_aud": 100000,
      "expected_annual_loss_aud": 2000,
      "evidence_refs": [],
      "control_refs": []
    }
  ],
  "ratings": {
    "risk": null,
    "evidence": null,
    "trajectory": "indeterminate",
    "insurability": null
  },
  "status": "provisional",
  "calibration_status": "unvalidated",
  "model_manifest_hash": null
}
```

All monetary values must include an explicit currency and valuation basis.

Production schemas must distinguish unknown, not-applicable and zero values.

---

## 13. Rating Engine Design

The rating engine should operate as a deterministic calculation pipeline where the relevant model supports determinism.

Processing sequence:

1. Receive assessment request.
2. Resolve risk object and policy context.
3. Retrieve versioned COPE attributes.
4. Retrieve evidence and verification state.
5. Evaluate freshness and completeness.
6. Generate a peril-specific feature set.
7. Execute approved peril models.
8. Calculate loss distributions and uncertainty measures.
9. Evaluate mitigation and recovery effects.
10. Produce risk indicators and insurability assessment.
11. Apply decision-support and referral rules.
12. Persist the immutable assessment snapshot.
13. Emit events and explanations.

### 13.1 Model manifest

Each model shall define:

- Model identifier and semantic version
- Supported perils and coverage types
- Input schema
- Output schema
- Parameter version
- Training and calibration provenance
- Known limitations
- Applicable jurisdictions
- Validation status
- Execution environment
- Dependency versions and hashes
- Approval information

### 13.2 Reproducibility

Identical inputs, parameters and reference datasets must yield identical outputs for deterministic models.

Stochastic models must expose simulation configurations, random seeds where applicable, and documented convergence/error bounds.

---

## 14. API Specification

Proposed REST interfaces:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /v1/assets | Register an insured asset |
| PUT | /v1/assets/{id}/cope | Update COPE profile |
| POST | /v1/evidence | Submit supporting evidence |
| POST | /v1/evidence/{id}/verify | Execute or record verification |
| POST | /v1/assessments | Request assessment |
| GET | /v1/assessments/{id} | Retrieve immutable result |
| GET | /v1/assets/{id}/trajectory | Retrieve risk history |
| GET | /v1/assets/{id}/recommendations | Retrieve mitigation actions |
| GET | /v1/models/{id}/manifest | Retrieve model description |

Writes require authentication, authorisation, validation and an audit trail.

Assessment and evidence submission APIs should support idempotency and explicit versioning.

### 14.1 Security

Minimum design requirements include:

- Strong service and user authentication
- Tenant-level data isolation
- Least-privilege authorisation
- Encryption in transit and at rest
- Data minimisation
- Signed or otherwise authenticated evidence where feasible
- Tamper-evident audit history
- Model artifact integrity checks
- Controlled model promotion
- Human approval for material underwriting overrides

Evidence signatures validate origin and integrity, not the truth of every observation.

---

## 15. Validation Framework

Validation shall occur across six independent domains.

### V1 — Data validation

Tests:

- Schema correctness
- Required fields
- Type and range constraints
- Timestamp consistency
- Duplicate detection
- Valid asset relationships
- Data provenance completeness

### V2 — Evidence validation

Tests:

- Signature or source verification
- Expiry and revocation
- Conflicting assertions
- Stale data
- Source independence
- Completeness
- Invalid evidence rejection

### V3 — Computational validation

Tests:

- Repeatability
- Formula correctness
- Unit consistency
- Boundary behaviour
- Model version pinning
- Deterministic replay
- Control interaction handling

### V4 — Actuarial validation

Tests:

- Frequency calibration
- Severity calibration
- Observed-versus-expected loss
- Out-of-time validation
- Segment-level performance
- Tail-loss estimation
- Sensitivity and stability

Relevant metrics may include log-likelihood, calibration error, deviance, prediction interval coverage and loss-based backtesting.

A single accuracy metric is insufficient for validation.

### V5 — Underwriting validation

Tests:

- Expert review
- Peril relevance
- Decision explainability
- Comparison with established underwriting practice
- Referral logic
- Stability under small data changes
- Treatment of missing evidence

### V6 — Governance validation

Tests:

- Privacy and lawful data use
- Appropriate discrimination and fairness review
- Model approvals
- Human oversight
- Record retention
- Access controls
- Change management
- Independent review and incident handling

---

## 16. Hypotheses to Test

The programme should be hypothesis-driven rather than assuming the modern framework necessarily outperforms traditional COPE.

**H1 — Evidence quality**

Verified, current evidence improves confidence in underwriting input data compared with self-declared data alone.

**H2 — Predictive improvement**

Adding condition and operational signals improves out-of-time loss prediction compared with a COPE-only benchmark.

**H3 — Mitigation measurement**

Verified controls are associated with measurable reductions in peril-specific frequency or severity after relevant confounders are considered.

**H4 — Temporal information**

Risk trajectory provides predictive information beyond current static characteristics.

**H5 — Customer outcomes**

Actionable assessments increase verified risk-improvement activity without encouraging intrusive monitoring.

**H6 — Operational efficiency**

Standardised, evidence-backed assessments reduce manual review effort while maintaining underwriting quality.

Each hypothesis requires a documented dataset, evaluation method, comparator, success threshold and review owner before testing.

---

## 17. Experimental Design

### Phase A — Synthetic reference environment

Construct representative synthetic property profiles covering different COPE attributes, controls, conditions and evidence states.

Validate calculations, schemas and explanation consistency.

Synthetic tests establish software behaviour, not actuarial validity.

### Phase B — Historical data study

Obtain de-identified or appropriately governed historical policy, asset and claims datasets.

Compare:

- Baseline COPE model
- COPE plus condition and controls
- COPE plus condition, controls and temporal information

Use temporal train-validation-test separation and prevent data leakage.

### Phase C — Independent evidence study

Measure how well supporting evidence confirms actual control state.

Compare declared versus independently inspected or instrumented property characteristics.

### Phase D — Shadow underwriting

Run DR² alongside established underwriting without affecting actual customer prices or eligibility.

Track predictive performance, discrepancies and referrals.

### Phase E — Controlled production pilot

Only after appropriate insurer, actuarial, regulatory, privacy and governance approvals, trial limited production use with predefined monitoring and rollback criteria.

---

## 18. Acceptance Criteria for v0.1

The reference implementation is accepted when:

- Five initial property perils can be represented.
- All four COPE groups are available through the canonical schema.
- Each material rating input can link to supporting evidence.
- Missing and conflicting evidence are represented without silent substitution.
- Peril-specific reference models are executable.
- Deterministic assessments reproduce exactly using pinned inputs and models.
- Assessment history is immutable and queryable.
- Ratings expose supporting factors and model versions.
- At least 30 defined scenario tests execute successfully.
- Unauthorised evidence modification is rejected.
- Manual overrides are attributable and auditable.
- Model limitations and unvalidated status appear in every relevant assessment response.

Passing these criteria establishes a functional research prototype, not production insurance suitability.

---

## 19. Delivery Roadmap

| Stage | Deliverable | Primary objective |
|---|---|---|
| 0 | Terminology and risk ontology | Agree canonical definitions |
| 1 | COPE and evidence schemas | Standardise input records |
| 2 | Evidence verification engine | Establish auditable assertions |
| 3 | Reference peril engine | Produce reproducible loss estimates |
| 4 | DR² rating service | Derive interpretable assessment outputs |
| 5 | Scenario test suite | Validate engine behaviour |
| 6 | Historical calibration study | Evaluate predictive performance |
| 7 | Underwriter assessment interface | Enable expert review |
| 8 | Shadow production integration | Compare against operational decisions |
| 9 | Governance-approved pilot | Test controlled real-world use |

Stages 0–5 form the initial engineering MVP.

Stages 6–9 require suitable real-world datasets, qualified review and insurer participation.

---

## 20. Proposed Technology Architecture

A reference implementation could use:

**Application runtime:** Node.js / TypeScript or JavaScript

**Calculation components:**
- Peril-specific rating modules
- Versioned configuration
- Deterministic assessment runner
- Explainability output
- Independent test harness

**Data components:**
- Relational store for canonical asset and policy data
- Object storage for evidence
- Immutable assessment snapshots
- Content-addressed model artifacts
- Append-only evidence and audit events
- Optional graph projection for evidence relationships

**Cloud components:**
- API Gateway
- Lambda
- S3
- RDS or equivalent transactional storage
- KMS
- EventBridge
- Monitoring and audit services

The architecture should remain cloud-portable at the model and data-contract level.

The first reference implementation should minimise dependencies and avoid unnecessary infrastructure complexity.

---

## 21. Governance and Regulatory Alignment

For Australian deployment, the framework should be assessed against applicable insurance, privacy, consumer-protection and prudential obligations.

Relevant sources include:

- APRA CPS 220 — Risk Management
- APRA GPG 240 — Insurance Risk
- APRA GPS 230 — Reinsurance Management, where applicable
- Australian Privacy Principles
- Applicable ASIC and insurance consumer obligations
- Insurer-specific governance, actuarial and pricing policies

The framework does not itself establish compliance.

Responsibilities and requirements depend on whether selfdriven.insure operates as a technology provider, service provider, intermediary, underwriting agency or licensed insurer.

Governance policies must define decision accountability, permitted data use, complaint and correction pathways, retention, model challenge and independent review.

---

## 22. Initial Implementation Priorities

The first development iteration should focus on five things:

**Priority 1 — Canonical risk objects**

A stable representation of properties, locations, perils, coverage and COPE characteristics.

**Priority 2 — Evidence as a first-class object**

Every significant claim about an asset or risk control should be traceable to its origin and verification state.

**Priority 3 — Peril-specific calculation interfaces**

A model contract that can support simple reference calculations initially and replace them with calibrated models later.

**Priority 4 — Independent reproducibility**

A third party should be able to reproduce an assessment using its specified inputs, model manifest and calculation rules, subject to lawful access controls.

**Priority 5 — Validation before pricing**

Risk indicators should remain separate from commercial pricing until their predictive usefulness and limitations are understood.

---

## 23. Future Extensions

The architecture should accommodate:

- Real-time sensor observations
- Dynamic catastrophe intelligence
- Asset digital twins
- Parametric products
- Continuous control assurance
- Portfolio concentration modelling
- Privacy-preserving evidence proofs
- Automated independent model verification
- AI-assisted explanations and mitigation proposals
- Federated assessment across insurers and communities

Autonomous agents may propose assessments, identify inconsistencies and recommend control improvements.

Material model changes and underwriting decisions should remain governed by explicitly defined authorisation policies.

---

## 24. Framework Principle

**COPE describes the foundational property risk.**

**DR² models its peril-specific risk, mitigation, resilience and evolution.**

**Evidence establishes what is known, by whom, when and with what confidence.**

**Validation establishes whether the model works.**

**Insurability establishes whether the risk can be sustainably transferred.**

Together, these concepts provide the foundation for a more transparent, measurable and continuously improving insurance risk system.

---

**Document status:** v0.1 / Foundational technical specification  
**Next engineering artifact:** DR² Reference Implementation v0.1, including canonical schemas, calculation interfaces, evidence verifier and automated test fixtures.
