# CI/CD Integration

## GitHub Actions

```yaml
name: Terraform Tests

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9.0

      - run: terraform fmt -check -recursive
      - run: terraform init
      - run: terraform validate
      - name: Run unit tests (plan mode; provider API access may still be required)
        run: terraform test -filter=tests/vpc_module_unit_test.tftest.hcl -verbose

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9.0

      - run: terraform init
      - name: Run integration tests
        run: terraform test -filter=tests/vpc_module_integration_test.tftest.hcl -verbose
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## GitLab CI

```yaml
stages:
  - validate
  - test

terraform-unit-tests:
  image: hashicorp/terraform:1.9
  stage: validate
  before_script:
    - terraform init
  script:
    - terraform fmt -check -recursive
    - terraform validate
    - terraform test -filter=tests/vpc_module_unit_test.tftest.hcl -verbose

terraform-integration-tests:
  image: hashicorp/terraform:1.9
  stage: test
  before_script:
    - terraform init
  script:
    - terraform test -filter=tests/vpc_module_integration_test.tftest.hcl -verbose
  only:
    - main
```

## Recommended CI Strategy

- Run unit tests on every PR; plan-only tests may still read provider APIs, while mock-only tests avoid cloud credentials
- Run integration tests only on merge to main or nightly — requires cloud credentials
- Use repeated `-filter=<exact-test-file-path>` options to select unit or integration test files (the filenames above match `EXAMPLES.md`); `-filter` does not match naming substrings or run block names
- Store cloud credentials as CI secrets, never in code
