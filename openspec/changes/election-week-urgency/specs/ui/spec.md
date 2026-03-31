# Delta for UI - Election Week Urgency

## ADDED Requirements

### Requirement: Election Countdown Display

The system SHALL display a countdown timer showing days and hours remaining until the April 12, 2026 election, using Peru timezone (UTC-5).

#### Scenario: Countdown shows correct time remaining

- GIVEN the current date is before April 12, 2026 at 00:00 PET
- WHEN the ElectionCountdown component renders
- THEN it displays the number of days remaining (integer)
- AND it displays the remaining hours (integer, 0-23)
- AND the format follows "X días Y horas"

#### Scenario: Countdown at exactly one day remaining

- GIVEN the current date is April 11, 2026 at 12:00 PET
- WHEN the countdown calculates
- THEN it displays "0 días" (or "1 día" if rounding up)
- AND it displays "12 horas"

#### Scenario: Election day passes

- GIVEN the current date is April 12, 2026 or later
- WHEN the countdown renders
- THEN it displays "0 días 0 horas" or a message indicating election has passed
- AND no negative values are shown

### Requirement: Last Updated Badge

The system SHALL display a visible badge showing the date of the most recent poll update (Ipsos March 26-27, 2026).

#### Scenario: Badge displays poll source and date

- GIVEN the LastUpdated component renders
- THEN it displays "Ipsos 26-27 marzo" as the source
- AND it is positioned visibly in the hero section
- AND it uses a distinct visual style (badge/pill)

#### Scenario: Badge is readable on mobile

- GIVEN the viewport width is 760px or less
- WHEN the badge renders
- THEN it does not overflow the container
- AND text remains readable without horizontal scroll

### Requirement: ONPE Voting Information

The system SHALL display voting information including election date, voting hours, and required identification.

#### Scenario: ONPE info displays required information

- GIVEN the OnpeInfo component renders
- THEN it displays the election date: "12 de abril de 2026"
- AND it displays the voting hours: "8:00 a.m. - 4:00 p.m."
- AND it displays the required document: "DNI"

#### Scenario: ONPE info is accessible

- GIVEN a user visits the page
- WHEN they need voting information
- THEN the ONPE info is visible without requiring interaction (or minimally, a toggle)
- AND it is positioned near the countdown or hero section

### Requirement: Components Integration

The three urgency components (Countdown, LastUpdated, OnpeInfo) SHALL be integrated into the page layout in a cohesive manner.

#### Scenario: Components render in hero section

- GIVEN the App.jsx includes the new components
- WHEN the page renders
- THEN the three components appear above or within the hero section
- AND they are visually coordinated (consistent spacing, typography)

#### Scenario: No layout conflicts with existing elements

- GIVEN existing elements (hero__lede, stats, candidate ranking) are present
- WHEN the new components are added
- THEN there is no overlap or layout breakage
- AND responsive breakpoints (760px, 980px) function correctly
