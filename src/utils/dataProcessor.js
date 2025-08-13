// Data processing utilities for The Football Family
import fs from 'fs';
import path from 'path';

// Function to get all teams from markdown files
export function getAllTeams() {
    const teamsDir = path.join(process.cwd(), 'src', 'content', 'teams');
    if (!fs.existsSync(teamsDir)) {
        return [];
    }
    
    const teamFiles = fs.readdirSync(teamsDir).filter(file => file.endsWith('.md'));
    return teamFiles.map(file => {
        const content = fs.readFileSync(path.join(teamsDir, file), 'utf-8');
        const frontmatter = content.split('---')[1];
        const lines = frontmatter.split('\n');
        const team = {};
        
        lines.forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    team[key.trim()] = value.slice(1, -1);
                } else if (value === 'true' || value === 'false') {
                    team[key.trim()] = value === 'true';
                } else if (!isNaN(value)) {
                    team[key.trim()] = parseInt(value);
                } else if (value.startsWith('{') || value.startsWith('[')) {
                    // Handle complex objects - for now, just store as string
                    team[key.trim()] = value;
                } else {
                    team[key.trim()] = value;
                }
            }
        });
        
        team.slug = file.replace('.md', '');
        return team;
    });
}

// Function to get a specific team by slug
export function getTeamBySlug(slug) {
    const teams = getAllTeams();
    return teams.find(team => team.slug === slug);
}

// Function to get the last 5 years (2020-2024, with 2023/24 as most recent complete)
export function getLastFiveYears() {
    return ['2024', '2023', '2022', '2021', '2020'];
}

// Function to get the most recent complete season
export function getMostRecentCompleteSeason() {
    return '2024'; // This represents 2023/24 season
}

// Function to read and parse match data from CSV files
export function getMatchDataForYears(years) {
    const dataDir = path.join(process.cwd(), 'data');
    const matchData = [];
    
    // Read the main match data file (2023/24 season)
    const mainMatchFile = path.join(dataDir, 'matches, 2023:24.csv');
    if (fs.existsSync(mainMatchFile)) {
        const content = fs.readFileSync(mainMatchFile, 'utf-8');
        const lines = content.split('\n');
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const match = {};
                headers.forEach((header, index) => {
                    match[header.trim()] = values[index]?.trim() || '';
                });
                matchData.push(match);
            }
        }
    }
    
    // Read the England CSV file (2024/25 season)
    const englandCsvFile = path.join(dataDir, 'England CSV.csv');
    if (fs.existsSync(englandCsvFile)) {
        const content = fs.readFileSync(englandCsvFile, 'utf-8');
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const match = {};
                headers.forEach((header, index) => {
                    match[header.trim()] = values[index]?.trim() || '';
                });
                
                // Convert the England CSV format to match our standard format
                const convertedMatch = {
                    Date: match.Date,
                    Season: match.Season,
                    Team: match.HomeTeam,
                    Opponent: match.AwayTeam,
                    GF: match['FTH Goals'],
                    GA: match['FTA Goals'],
                    Result: match['FT Result'] === 'H' ? 'W' : match['FT Result'] === 'A' ? 'L' : 'D',
                    Venue: 'Home',
                    Comp: match.League,
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee,
                    // Additional stats from England CSV
                    H_Shots: match['H Shots'],
                    A_Shots: match['A Shots'],
                    H_SOT: match['H SOT'],
                    A_SOT: match['A SOT'],
                    H_Fouls: match['H Fouls'],
                    A_Fouls: match['A Fouls'],
                    H_Corners: match['H Corners'],
                    A_Corners: match['A Corners'],
                    H_Yellow: match['H Yellow'],
                    A_Yellow: match['A Yellow'],
                    H_Red: match['H Red'],
                    A_Red: match['A Red']
                };
                matchData.push(convertedMatch);
                
                // Also add the away team perspective
                const awayMatch = {
                    Date: match.Date,
                    Season: match.Season,
                    Team: match.AwayTeam,
                    Opponent: match.HomeTeam,
                    GF: match['FTA Goals'],
                    GA: match['FTH Goals'],
                    Result: match['FT Result'] === 'A' ? 'W' : match['FT Result'] === 'H' ? 'L' : 'D',
                    Venue: 'Away',
                    Comp: match.League,
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee,
                    // Additional stats from England CSV (reversed for away team)
                    H_Shots: match['A Shots'],
                    A_Shots: match['H Shots'],
                    H_SOT: match['A SOT'],
                    A_SOT: match['H SOT'],
                    H_Fouls: match['A Fouls'],
                    A_Fouls: match['H Fouls'],
                    H_Corners: match['A Corners'],
                    A_Corners: match['H Corners'],
                    H_Yellow: match['A Yellow'],
                    A_Yellow: match['H Yellow'],
                    H_Red: match['A Red'],
                    A_Red: match['H Red']
                };
                matchData.push(awayMatch);
            }
        }
    }
    
    // Read the England 2 CSV file (additional data)
    const england2CsvFile = path.join(dataDir, 'England 2 CSV.csv');
    if (fs.existsSync(england2CsvFile)) {
        const content = fs.readFileSync(england2CsvFile, 'utf-8');
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const match = {};
                headers.forEach((header, index) => {
                    match[header.trim()] = values[index]?.trim() || '';
                });
                
                // Convert the England 2 CSV format to match our standard format
                const convertedMatch = {
                    Date: match.Date,
                    Season: match.Season,
                    Team: match.HomeTeam,
                    Opponent: match.AwayTeam,
                    GF: match['FTH Goals'],
                    GA: match['FTA Goals'],
                    Result: match['FT Result'] === 'H' ? 'W' : match['FT Result'] === 'A' ? 'L' : 'D',
                    Venue: 'Home',
                    Comp: match.League,
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee,
                    // Additional stats from England 2 CSV
                    H_Shots: match['H Shots'],
                    A_Shots: match['A Shots'],
                    H_SOT: match['H SOT'],
                    A_SOT: match['A SOT'],
                    H_Fouls: match['H Fouls'],
                    A_Fouls: match['A Fouls'],
                    H_Corners: match['H Corners'],
                    A_Corners: match['A Corners'],
                    H_Yellow: match['H Yellow'],
                    A_Yellow: match['A Yellow'],
                    H_Red: match['H Red'],
                    A_Red: match['A Red']
                };
                matchData.push(convertedMatch);
                
                // Also add the away team perspective
                const awayMatch = {
                    Date: match.Date,
                    Season: match.Season,
                    Team: match.AwayTeam,
                    Opponent: match.HomeTeam,
                    GF: match['FTA Goals'],
                    GA: match['FTH Goals'],
                    Result: match['FT Result'] === 'A' ? 'W' : match['FT Result'] === 'H' ? 'L' : 'D',
                    Venue: 'Away',
                    Comp: match.League,
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee,
                    // Additional stats from England 2 CSV (reversed for away team)
                    H_Shots: match['A Shots'],
                    A_Shots: match['H Shots'],
                    H_SOT: match['A SOT'],
                    A_SOT: match['H SOT'],
                    H_Fouls: match['A Fouls'],
                    A_Fouls: match['H Fouls'],
                    H_Corners: match['A Corners'],
                    A_Corners: match['H Corners'],
                    H_Yellow: match['A Yellow'],
                    A_Yellow: match['H Yellow'],
                    H_Red: match['A Red'],
                    A_Red: match['H Red']
                };
                matchData.push(awayMatch);
            }
        }
    }
    
    // Read the dataset file (2020-09-24)
    const datasetFile = path.join(dataDir, 'dataset - 2020-09-24.csv');
    if (fs.existsSync(datasetFile)) {
        const content = fs.readFileSync(datasetFile, 'utf-8');
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const match = {};
                headers.forEach((header, index) => {
                    match[header.trim()] = values[index]?.trim() || '';
                });
                
                // Convert the dataset format to match our standard format
                const convertedMatch = {
                    Date: match.Date,
                    Season: match.Season || '2020',
                    Team: match.HomeTeam,
                    Opponent: match.AwayTeam,
                    GF: match.FTHG || match['FTH Goals'],
                    GA: match.FTAG || match['FTA Goals'],
                    Result: match.FTR || match['FT Result'],
                    Venue: 'Home',
                    Comp: match.League || 'Premier League',
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee
                };
                matchData.push(convertedMatch);
                
                // Also add the away team perspective
                const awayMatch = {
                    Date: match.Date,
                    Season: match.Season || '2020',
                    Team: match.AwayTeam,
                    Opponent: match.HomeTeam,
                    GF: match.FTAG || match['FTA Goals'],
                    GA: match.FTHG || match['FTH Goals'],
                    Result: match.FTR === 'A' ? 'W' : match.FTR === 'H' ? 'L' : 'D',
                    Venue: 'Away',
                    Comp: match.League || 'Premier League',
                    Round: '',
                    Attendance: '',
                    Formation: '',
                    Captain: '',
                    Referee: match.Referee
                };
                matchData.push(awayMatch);
            }
        }
    }
    
    // Read historical data file
    const historicalFile = path.join(dataDir, 'English_Premire_League_History_1992_2022.csv');
    if (fs.existsSync(historicalFile)) {
        const content = fs.readFileSync(historicalFile, 'utf-8');
        const lines = content.split('\n');
        
        // Find the DETAILS section
        let detailsStart = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('DETAILS')) {
                detailsStart = i + 2; // Skip the DETAILS line and empty line
                break;
            }
        }
        
        if (detailsStart > 0) {
            const headers = lines[detailsStart].split(',');
            
            for (let i = detailsStart + 1; i < lines.length; i++) {
                if (lines[i].trim() && !lines[i].startsWith(',')) {
                    const values = lines[i].split(',');
                    if (values.length > 10) {
                        const match = {};
                        headers.forEach((header, index) => {
                            match[header.trim()] = values[index]?.trim() || '';
                        });
                        matchData.push(match);
                    }
                }
            }
        }
    }
    
    return matchData;
}

// Function to get team statistics for specific years
export function getTeamStatistics(teamSlug, years) {
    const matchData = getMatchDataForYears(years);
    const team = getTeamBySlug(teamSlug);
    
    if (!team) return null;
    
    // Normalize team names for matching
    const teamNameVariations = [
        team.title || team.name,
        team.title?.replace(' ', '') || team.name?.replace(' ', ''),
        team.title?.replace(' ', '&') || team.name?.replace(' ', '&'),
        team.title?.replace(' ', '') || team.name?.replace(' ', '')
    ];
    
    const teamMatches = matchData.filter(match => {
        const matchTeam = match.Team || match.TEAM;
        return teamNameVariations.some(variation => 
            matchTeam && matchTeam.toLowerCase().includes(variation.toLowerCase())
        );
    });
    
    const stats = {
        totalMatches: teamMatches.length,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        seasons: {},
        latestSeason: null
    };
    
    teamMatches.forEach(match => {
        const result = match.Result || match.RESULT;
        const gf = parseInt(match.GF || match.GOAL_FOR || '0');
        const ga = parseInt(match.GA || match.GOAL_AGAINST || '0');
        const season = match.Season || match.SEASON;
        
        if (result === 'W') {
            stats.wins++;
            stats.points += 3;
        } else if (result === 'D') {
            stats.draws++;
            stats.points += 1;
        } else if (result === 'L') {
            stats.losses++;
        }
        
        stats.goalsFor += gf;
        stats.goalsAgainst += ga;
        
        if (season && !stats.seasons[season]) {
            stats.seasons[season] = {
                matches: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0
            };
        }
        
        if (season) {
            stats.seasons[season].matches++;
            if (result === 'W') {
                stats.seasons[season].wins++;
                stats.seasons[season].points += 3;
            } else if (result === 'D') {
                stats.seasons[season].draws++;
                stats.seasons[season].points += 1;
            } else if (result === 'L') {
                stats.seasons[season].losses++;
            }
            stats.seasons[season].goalsFor += gf;
            stats.seasons[season].goalsAgainst += ga;
        }
    });
    
    // Find the latest season
    const seasonKeys = Object.keys(stats.seasons).sort().reverse();
    if (seasonKeys.length > 0) {
        stats.latestSeason = seasonKeys[0];
    }
    
    stats.goalDifference = stats.goalsFor - stats.goalsAgainst;
    stats.winRate = stats.totalMatches > 0 ? ((stats.wins / stats.totalMatches) * 100).toFixed(1) : 0;
    
    return stats;
}

// Function to get recent matches for a team
export function getRecentMatches(teamSlug, limit = 10) {
    const matchData = getMatchDataForYears(['2024', '2023']);
    const team = getTeamBySlug(teamSlug);
    
    if (!team) return [];
    
    const teamNameVariations = [
        team.title || team.name,
        team.title?.replace(' ', '') || team.name?.replace(' ', ''),
        team.title?.replace(' ', '&') || team.name?.replace(' ', '&')
    ];
    
    const teamMatches = matchData.filter(match => {
        const matchTeam = match.Team || match.TEAM;
        return teamNameVariations.some(variation => 
            matchTeam && matchTeam.toLowerCase().includes(variation.toLowerCase())
        );
    });
    
    // Sort by date (most recent first) and return limited results
    return teamMatches
        .sort((a, b) => new Date(b.Date || b.DATE) - new Date(a.Date || a.DATE))
        .slice(0, limit);
}

// Function to get SVG badge for a team
export function getTeamBadge(teamSlug) {
    // Map team slugs to their individual SVG files
    const teamBadges = {
        'arsenal': '/images/badges/arsenal.svg',
        'aston-villa': '/images/badges/aston-villa.svg',
        'brighton': '/images/badges/brighton.svg',
        'burnley': '/images/badges/burnley.svg',
        'chelsea': '/images/badges/Chelsea.svg',
        'crystal-palace': '/images/badges/crystal-palace.svg',
        'everton': '/images/badges/everton.svg',
        'fulham': '/images/badges/fulham.svg',
        'manchester-city': '/images/badges/manchester-city.svg',
        'manchester-united': '/images/badges/manchester-united.svg',
        'newcastle-united': '/images/badges/newcastel-untied.svg', // Note: typo in filename
        'nottingham-forest': '/images/badges/nottingham-forest.svg',
        'sheffield-united': '/images/badges/sheffield-united.png', // Note: PNG file
        'tottenham': '/images/badges/tottenham.svg',
        'west-ham': '/images/badges/west-ham.svg',
        'wolves': '/images/badges/wolves.svg',
        'brentford': '/images/badges/brentford.svg',
        'bournemouth': '/images/badges/bournemouth.svg'
    };
    
    // Check if we have an individual badge file
    const badgePath = teamBadges[teamSlug];
    if (badgePath) {
        return {
            type: badgePath.endsWith('.svg') ? 'svg' : 'image',
            path: badgePath
        };
    }
    
    // Fallback to combined SVG for teams without individual files
    const teamPositions = {
        'liverpool': { x: 29760, y: 0, width: 3720, height: 2968 },
        'luton-town': { x: 33480, y: 0, width: 3720, height: 2968 }
    };
    
    const position = teamPositions[teamSlug];
    if (position) {
        return {
            type: 'combined-svg',
            svgPath: '/images/badges/Premier-League-Clubs-Logos.svg',
            viewBox: `${position.x} ${position.y} ${position.width} ${position.height}`,
            clipPath: `url(#clip${teamSlug.replace('-', '_')})`
        };
    }
    
    return null;
}