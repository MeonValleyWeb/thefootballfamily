// Data processing utilities for The Football Family
import fs from 'fs';
import path from 'path';

export class FootballDataProcessor {
    constructor(dataPath = '/Users/andrew/Workspace/thefootballfamily/data') {
        this.dataPath = dataPath;
    }

    // Parse CSV data
    parseCSV(csvContent) {
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }

        return data;
    }

    // Process Premier League history data
    processPremierLeagueHistory() {
        try {
            const csvPath = path.join(this.dataPath, 'English_Premire_League_History_1992_2022.csv');
            const csvContent = fs.readFileSync(csvPath, 'utf-8');
            
            // This CSV has a unique format - let's parse it manually
            const lines = csvContent.split('\n');
            const teams = {};
            
            // Skip the first few lines and find the data
            for (let i = 2; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim() && !line.startsWith(',')) {
                    const parts = line.split(',');
                    const teamName = parts[0];
                    if (teamName && teamName !== '') {
                        teams[teamName] = {
                            name: teamName,
                            positions: {}
                        };
                        
                        // Extract positions for each season
                        for (let j = 1; j < parts.length && j < 31; j++) {
                            const season = this.getSeasonFromIndex(j);
                            const position = parts[j];
                            if (position && position !== '') {
                                teams[teamName].positions[season] = parseInt(position) || null;
                            }
                        }
                    }
                }
            }
            
            return teams;
        } catch (error) {
            console.error('Error processing Premier League history:', error);
            return {};
        }
    }

    // Get season from column index
    getSeasonFromIndex(index) {
        const seasons = [
            '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17',
            '2015-16', '2014-15', '2013-14', '2012-13', '2011-12', '2010-11',
            '2009-10', '2008-09', '2007-08', '2006-07', '2005-06', '2004-05',
            '2003-04', '2002-03', '2001-02', '2000-01', '1999-00', '1998-99',
            '1997-98', '1996-97', '1995-96', '1994-95', '1993-94', '1992-93'
        ];
        return seasons[index - 1] || '';
    }

    // Process match data
    processMatchData() {
        try {
            const csvPath = path.join(this.dataPath, 'matches, 2023:24.csv');
            const csvContent = fs.readFileSync(csvPath, 'utf-8');
            return this.parseCSV(csvContent);
        } catch (error) {
            console.error('Error processing match data:', error);
            return [];
        }
    }

    // Generate team markdown files
    generateTeamMarkdownFiles() {
        const historyData = this.processPremierLeagueHistory();
        const contentDir = path.join(process.cwd(), 'src', 'content', 'teams');
        
        // Create content directory if it doesn't exist
        if (!fs.existsSync(contentDir)) {
            fs.mkdirSync(contentDir, { recursive: true });
        }

        Object.keys(historyData).forEach(teamName => {
            const team = historyData[teamName];
            const slug = this.createSlug(teamName);
            
            const markdownContent = this.generateTeamMarkdown(team);
            const filePath = path.join(contentDir, `${slug}.md`);
            
            fs.writeFileSync(filePath, markdownContent);
            console.log(`Generated ${filePath}`);
        });
    }

    // Create URL-friendly slug
    createSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Generate markdown content for a team
    generateTeamMarkdown(team) {
        const recentSeasons = Object.keys(team.positions)
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 5);

        const bestPosition = Math.min(...Object.values(team.positions).filter(p => p !== null));
        const worstPosition = Math.max(...Object.values(team.positions).filter(p => p !== null));
        const averagePosition = Math.round(
            Object.values(team.positions).filter(p => p !== null).reduce((a, b) => a + b, 0) / 
            Object.values(team.positions).filter(p => p !== null).length
        );

        return `---
title: "${team.name}"
slug: "${this.createSlug(team.name)}"
founded: ""
stadium: ""
capacity: ""
owner: ""
manager: ""
website: ""
colors:
  primary: ""
  secondary: ""
league_positions:
${recentSeasons.map(season => `  "${season}": ${team.positions[season] || 'null'}`).join('\n')}
statistics:
  best_position: ${bestPosition}
  worst_position: ${worstPosition}
  average_position: ${averagePosition}
  seasons_in_pl: ${Object.keys(team.positions).length}
---

# ${team.name}

## Overview

${team.name} is a Premier League football club with a rich history in English football.

## Recent Performance

### Last 5 Seasons
${recentSeasons.map(season => `- **${season}**: ${team.positions[season] ? `${this.getPositionSuffix(team.positions[season])} place` : 'Not in Premier League'}`).join('\n')}

## Statistics

- **Best Premier League Finish**: ${this.getPositionSuffix(bestPosition)} place
- **Worst Premier League Finish**: ${this.getPositionSuffix(worstPosition)} place
- **Average Position**: ${this.getPositionSuffix(averagePosition)} place
- **Seasons in Premier League**: ${Object.keys(team.positions).length}

## Stadium Information

*Stadium details to be added*

## Current Squad

*Squad information to be added*

## Recent Transfers

*Transfer information to be added*

## Matchday Information

### For Away Fans

*Matchday guide to be added*

## News & Updates

*Latest news to be added*
`;
    }

    // Get position suffix (1st, 2nd, 3rd, etc.)
    getPositionSuffix(position) {
        if (position % 10 === 1 && position % 100 !== 11) return position + 'st';
        if (position % 10 === 2 && position % 100 !== 12) return position + 'nd';
        if (position % 10 === 3 && position % 100 !== 13) return position + 'rd';
        return position + 'th';
    }
}

// Export for use in other files
export default FootballDataProcessor;