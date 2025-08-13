// Club badge URLs and team data
export const clubBadges = {
    'arsenal': 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png',
    'aston-villa': 'https://logos-world.net/wp-content/uploads/2020/06/Aston-Villa-Logo.png',
    'brighton': 'https://logos-world.net/wp-content/uploads/2020/06/Brighton-Hove-Albion-Logo.png',
    'burnley': 'https://logos-world.net/wp-content/uploads/2020/06/Burnley-Logo.png',
    'chelsea': 'https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png',
    'crystal-palace': 'https://logos-world.net/wp-content/uploads/2020/06/Crystal-Palace-Logo.png',
    'everton': 'https://logos-world.net/wp-content/uploads/2020/06/Everton-Logo.png',
    'fulham': 'https://logos-world.net/wp-content/uploads/2020/06/Fulham-Logo.png',
    'liverpool': 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
    'luton-town': 'https://logos-world.net/wp-content/uploads/2020/06/Luton-Town-Logo.png',
    'manchester-city': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png',
    'manchester-united': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
    'newcastle-united': 'https://logos-world.net/wp-content/uploads/2020/06/Newcastle-United-Logo.png',
    'nottingham-forest': 'https://logos-world.net/wp-content/uploads/2020/06/Nottingham-Forest-Logo.png',
    'sheffield-united': 'https://logos-world.net/wp-content/uploads/2020/06/Sheffield-United-Logo.png',
    'tottenham': 'https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Logo.png',
    'west-ham': 'https://logos-world.net/wp-content/uploads/2020/06/West-Ham-United-Logo.png',
    'wolves': 'https://logos-world.net/wp-content/uploads/2020/06/Wolverhampton-Wanderers-Logo.png',
    'brentford': 'https://logos-world.net/wp-content/uploads/2020/06/Brentford-Logo.png',
    'bournemouth': 'https://logos-world.net/wp-content/uploads/2020/06/AFC-Bournemouth-Logo.png'
};

// Alternative badge sources (more reliable)
export const clubBadgesAlt = {
    'arsenal': '/images/badges/arsenal.png',
    'aston-villa': '/images/badges/aston-villa.png',
    'brighton': '/images/badges/brighton.png',
    'burnley': '/images/badges/burnley.png',
    'chelsea': '/images/badges/chelsea.png',
    'crystal-palace': '/images/badges/crystal-palace.png',
    'everton': '/images/badges/everton.png',
    'fulham': '/images/badges/fulham.png',
    'liverpool': '/images/badges/liverpool.png',
    'luton-town': '/images/badges/luton-town.png',
    'manchester-city': '/images/badges/manchester-city.png',
    'manchester-united': '/images/badges/manchester-united.png',
    'newcastle-united': '/images/badges/newcastle-united.png',
    'nottingham-forest': '/images/badges/nottingham-forest.png',
    'sheffield-united': '/images/badges/sheffield-united.png',
    'tottenham': '/images/badges/tottenham.png',
    'west-ham': '/images/badges/west-ham.png',
    'wolves': '/images/badges/wolves.png',
    'brentford': '/images/badges/brentford.png',
    'bournemouth': '/images/badges/bournemouth.png'
};

export function getClubBadge(slug) {
    return clubBadgesAlt[slug] || clubBadges[slug] || '/images/badges/default.png';
}

export function getClubInitials(teamName) {
    return teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 3);
}