# Git Commit Guidelines

## Commit Message Format

Use the following format for all commit messages:

```
<type>: <description> #<issue-number>

[optional body]

[optional footer]
```

### Types
- **Fix**: Bug fixes
- **Feat**: New features
- **Docs**: Documentation changes
- **Style**: Code style changes (formatting, missing semicolons, etc.)
- **Refactor**: Code refactoring
- **Test**: Adding or updating tests
- **Chore**: Maintenance tasks

### Examples

```bash
Fix: Authentication state persistence #001

- Implemented localStorage for user data persistence
- Added token validation on app initialization
- Fixed session management across browser refreshes

Resolves: #001
```

```bash
Feat: Add chat functionality for ride communication #015

- Created ChatModal component with real-time messaging
- Integrated chat with ride booking system
- Added message history persistence

Closes: #015
```

```bash
Test: Add regression tests for authentication flow #001

- Added test cases for login/logout functionality
- Created test scenarios for session persistence
- Updated QA checklist with authentication tests

Related: #001
```

## Commit History for Current Release

### Bug Fixes
- `Fix: Authentication state persistence #001`
- `Fix: Ride data synchronization #002`
- `Fix: Mobile responsiveness improvements #003`
- `Fix: Standardize form validation #004`

### Features
- `Feat: Enhanced UI animations and transitions #008`
- `Feat: Add user review and rating system #010`
- `Feat: Implement admin dashboard #012`
- `Feat: Add chat functionality for ride communication #015`

### Documentation
- `Docs: Add comprehensive QA documentation #020`
- `Docs: Create regression test cases #021`
- `Docs: Update README with deployment instructions #022`

### Tests
- `Test: Add regression tests for authentication flow #001`
- `Test: Create UI/UX test cases #003`
- `Test: Add performance and compatibility tests #013`

## Branch Strategy

- **main**: Production-ready code
- **develop**: Development branch for integration
- **feature/**: Feature branches (e.g., feature/chat-system)
- **fix/**: Bug fix branches (e.g., fix/login-error)
- **test/**: Test-related branches (e.g., test/regression-suite)

## Pre-commit Checklist

Before committing code, ensure:
- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] No console.log statements in production code
- [ ] Documentation is updated if needed
- [ ] Commit message follows the format above
- [ ] Issue number is referenced in commit message
