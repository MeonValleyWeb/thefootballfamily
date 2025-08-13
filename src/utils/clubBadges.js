// Club badge URLs and team data
export const clubBadges = {
    'arsenal': 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.svg',
    'aston-villa': 'https://logos-world.net/wp-content/uploads/2020/06/Aston-Villa-Logo.svg',
    'brighton': 'https://logos-world.net/wp-content/uploads/2020/06/Brighton-Hove-Albion-Logo.svg',
    'burnley': 'https://logos-world.net/wp-content/uploads/2020/06/Burnley-Logo.svg',
    'chelsea': 'https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.svg',
    'crystal-palace': 'https://logos-world.net/wp-content/uploads/2020/06/Crystal-Palace-Logo.svg',
    'everton': 'https://logos-world.net/wp-content/uploads/2020/06/Everton-Logo.svg',
    'fulham': 'https://logos-world.net/wp-content/uploads/2020/06/Fulham-Logo.svg',
    'liverpool': 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.svg',
    'luton-town': 'https://logos-world.net/wp-content/uploads/2020/06/Luton-Town-Logo.svg',
    'manchester-city': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.svg',
    'manchester-united': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.svg',
    'newcastle-united': 'https://logos-world.net/wp-content/uploads/2020/06/Newcastle-United-Logo.svg',
    'nottingham-forest': 'https://logos-world.net/wp-content/uploads/2020/06/Nottingham-Forest-Logo.svg',
    'sheffield-united': 'https://logos-world.net/wp-content/uploads/2020/06/Sheffield-United-Logo.svg',
    'tottenham': 'https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Logo.svg',
    'west-ham': 'https://logos-world.net/wp-content/uploads/2020/06/West-Ham-United-Logo.svg',
    'wolves': 'https://logos-world.net/wp-content/uploads/2020/06/Wolverhampton-Wanderers-Logo.svg',
    'brentford': 'https://logos-world.net/wp-content/uploads/2020/06/Brentford-Logo.svg',
    'bournemouth': 'https://logos-world.net/wp-content/uploads/2020/06/AFC-Bournemouth-Logo.svg'
};

// Alternative badge sources (more reliable)
export const clubBadgesAlt = {
    'arsenal': '/images/badges/arsenal.svg',
    'aston-villa': '/images/badges/aston-villa.svg',
    'brighton': '/images/badges/brighton.svg',
    'burnley': '/images/badges/burnley.svg',
    'chelsea': '/images/badges/chelsea.svg',
    'crystal-palace': '/images/badges/crystal-palace.svg',
    'everton': '/images/badges/everton.svg',
    'fulham': '/images/badges/fulham.svg',
    'liverpool': '/images/badges/liverpool.svg',
    'luton-town': '/images/badges/luton-town.svg',
    'manchester-city': '/images/badges/manchester-city.svg',
    'manchester-united': '/images/badges/manchester-united.svg',
    'newcastle-united': '/images/badges/newcastle-united.svg',
    'nottingham-forest': '/images/badges/nottingham-forest.svg',
    'sheffield-united': '/images/badges/sheffield-united.svg',
    'tottenham': '/images/badges/tottenham.svg',
    'west-ham': '/images/badges/west-ham.svg',
    'wolves': '/images/badges/wolves.svg',
    'brentford': '/images/badges/brentford.svg',
    'bournemouth': '/images/badges/bournemouth.svg'
};

export function getClubBadge(slug) {
    return clubBadgesAlt[slug] || clubBadges[slug] || '/images/badges/default.svg';
}

export function getClubInitials(teamName) {
    return teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 3);
}