import fs from 'fs';
import path from 'path';

// Premier League teams data
const teams = [
    { name: 'Arsenal', slug: 'arsenal', founded: 1886, stadium: 'Emirates Stadium', capacity: 60704, colors: { primary: '#EF0107', secondary: '#FFFFFF' } },
    { name: 'Aston Villa', slug: 'aston-villa', founded: 1874, stadium: 'Villa Park', capacity: 42682, colors: { primary: '#95BFE5', secondary: '#670E36' } },
    { name: 'Brighton & Hove Albion', slug: 'brighton', founded: 1901, stadium: 'American Express Community Stadium', capacity: 31800, colors: { primary: '#0057B8', secondary: '#FFCD00' } },
    { name: 'Burnley', slug: 'burnley', founded: 1882, stadium: 'Turf Moor', capacity: 21944, colors: { primary: '#6C1D45', secondary: '#99D6EA' } },
    { name: 'Chelsea', slug: 'chelsea', founded: 1905, stadium: 'Stamford Bridge', capacity: 40834, colors: { primary: '#034694', secondary: '#FFFFFF' } },
    { name: 'Crystal Palace', slug: 'crystal-palace', founded: 1905, stadium: 'Selhurst Park', capacity: 25486, colors: { primary: '#1B458F', secondary: '#A7A5A6' } },
    { name: 'Everton', slug: 'everton', founded: 1878, stadium: 'Goodison Park', capacity: 39414, colors: { primary: '#003399', secondary: '#FFFFFF' } },
    { name: 'Fulham', slug: 'fulham', founded: 1879, stadium: 'Craven Cottage', capacity: 19359, colors: { primary: '#FFFFFF', secondary: '#000000' } },
    { name: 'Liverpool', slug: 'liverpool', founded: 1892, stadium: 'Anfield', capacity: 53394, colors: { primary: '#C8102E', secondary: '#FFFFFF' } },
    { name: 'Luton Town', slug: 'luton-town', founded: 1885, stadium: 'Kenilworth Road', capacity: 10356, colors: { primary: '#F78F1E', secondary: '#002D62' } },
    { name: 'Manchester City', slug: 'manchester-city', founded: 1880, stadium: 'Etihad Stadium', capacity: 55017, colors: { primary: '#6CABDD', secondary: '#FFFFFF' } },
    { name: 'Manchester United', slug: 'manchester-united', founded: 1878, stadium: 'Old Trafford', capacity: 74310, colors: { primary: '#DA020E', secondary: '#FFFFFF' } },
    { name: 'Newcastle United', slug: 'newcastle-united', founded: 1892, stadium: 'St. James\' Park', capacity: 52305, colors: { primary: '#241F20', secondary: '#FFFFFF' } },
    { name: 'Nottingham Forest', slug: 'nottingham-forest', founded: 1865, stadium: 'The City Ground', capacity: 30445, colors: { primary: '#DD0000', secondary: '#FFFFFF' } },
    { name: 'Sheffield United', slug: 'sheffield-united', founded: 1889, stadium: 'Bramall Lane', capacity: 32050, colors: { primary: '#EE2737', secondary: '#FFFFFF' } },
    { name: 'Tottenham Hotspur', slug: 'tottenham', founded: 1882, stadium: 'Tottenham Hotspur Stadium', capacity: 62850, colors: { primary: '#132257', secondary: '#FFFFFF' } },
    { name: 'West Ham United', slug: 'west-ham', founded: 1895, stadium: 'London Stadium', capacity: 66000, colors: { primary: '#7A263A', secondary: '#1BB1E7' } },
    { name: 'Wolverhampton Wanderers', slug: 'wolves', founded: 1877, stadium: 'Molineux Stadium', capacity: 31700, colors: { primary: '#FDB462', secondary: '#231F20' } },
    { name: 'Brentford', slug: 'brentford', founded: 1889, stadium: 'Brentford Community Stadium', capacity: 17250, colors: { primary: '#E30613', secondary: '#FFFFFF' } },
    { name: 'AFC Bournemouth', slug: 'bournemouth', founded: 1899, stadium: 'Vitality Stadium', capacity: 11364, colors: { primary: '#DA020E', secondary: '#000000' } }
];

// Generate markdown content for a team
function generateTeamMarkdown(team) {
    return `---
title: "${team.name}"
slug: "${team.slug}"
founded: ${team.founded}
stadium: "${team.stadium}"
capacity: ${team.capacity}
owner: ""
manager: ""
website: ""
tagline: "Discover the rich history and current form of ${team.name}"
colors:
  primary: "${team.colors.primary}"
  secondary: "${team.colors.secondary}"
league_positions:
  "2023-24": null
  "2022-23": null
  "2021-22": null
  "2020-21": null
  "2019-20": null
statistics:
  best_position: null
  worst_position: null
  average_position: null
  seasons_in_pl: null
  titles: null
  fa_cups: null
  league_cups: null
---

# ${team.name}

## Overview

${team.name} is a Premier League football club with a rich history in English football.

## Recent Performance

### Last 5 Seasons
- **2023-24**: TBD
- **2022-23**: TBD
- **2021-22**: TBD
- **2020-21**: TBD
- **2019-20**: TBD

## Stadium Information

**${team.stadium}** is the home ground of ${team.name}.

- **Capacity**: ${team.capacity.toLocaleString()}
- **Address**: TBD
- **Opened**: TBD

### Getting There
- **Nearest Stations**: TBD
- **Parking**: TBD
- **Accessibility**: TBD

## Current Squad

### Key Players
*To be updated*

## Recent Transfers

*Transfer information to be added*

## Matchday Information

### For Away Fans

*Matchday guide to be added*

## Club Records

*Club records to be added*

## Honours

*Honours to be added*

## News & Updates

*Latest news to be added*
`;
}

// Create content directory if it doesn't exist
const contentDir = path.join(process.cwd(), 'src', 'content', 'teams');
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

// Generate markdown files for all teams
teams.forEach(team => {
    const markdownContent = generateTeamMarkdown(team);
    const filePath = path.join(contentDir, `${team.slug}.md`);
    
    fs.writeFileSync(filePath, markdownContent);
    console.log(`Generated ${filePath}`);
});

console.log('All team markdown files generated successfully!');
