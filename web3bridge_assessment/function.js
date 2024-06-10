// document.addEventListener('DOMContentLoaded', () => {
//     const desksContainer = document.getElementById('desks-container');
//     const deskTypeSelect = document.getElementById('desk-type');
//     const membershipTierSelect = document.getElementById('tier');
//     const hoursInput = document.getElementById('hours');
//     const bookButton = document.getElementById('book-btn');
    
//     const totalRevenueElem = document.getElementById('total-revenue');
//     const revenueBasicElem = document.getElementById('revenue-basic');
//     const revenuePremiumElem = document.getElementById('revenue-premium');
//     const revenueExecutiveElem = document.getElementById('revenue-executive');
//     const revenueTeamElem = document.getElementById('revenue-team');

//     const deskPrices = {
//         basic: 10,
//         premium: 15,
//         executive: 20,
//         team: 25
//     };

//     const revenue = {
//         total: 0,
//         basic: 0,
//         premium: 0,
//         executive: 0,
//         team: 0
//     };

//     const desks = [];

//     // Initialize desks
//     for (let i = 1; i <= 15; i++) {
//         const desk = document.createElement('div');
//         desk.classList.add('desk');
//         desk.classList.add(i <= 10 ? 'individual' : 'team');
//         desk.textContent = i;
//         desk.addEventListener('click', () => bookDesk(desk));
//         desks.push(desk);
//         desksContainer.appendChild(desk);
//     }

//     // Update membership tier visibility based on desk type
//     deskTypeSelect.addEventListener('change', () => {
//         membershipTierSelect.style.display = deskTypeSelect.value === 'team' ? 'none' : 'block';
//     });

//     // Handle booking
//     function bookDesk(desk) {
//         if (desk.classList.contains('booked')) return;

//         const hours = parseInt(hoursInput.value);
//         if (isNaN(hours) || hours <= 0) {
//             alert('Please enter a valid number of hours.');
//             return;
//         }

//         let pricePerHour = 0;
//         let tier = '';
//         if (desk.classList.contains('individual')) {
//             tier = membershipTierSelect.value;
//             pricePerHour = deskPrices[tier];
//         } else {
//             pricePerHour = deskPrices.team;
//         }

//         let totalCharge = pricePerHour * hours;
//         if (hours > 3) {
//             totalCharge *= 0.9;
//         }

//         alert(`Desk ${desk.textContent} booked for ${hours} hours. Total charge: $${totalCharge.toFixed(2)}`);
//         desk.classList.add('booked');

//         // Update revenue
//         revenue.total += totalCharge;
//         if (tier) {
//             revenue[tier] += totalCharge;
//         } else {
//             revenue.team += totalCharge;
//         }

//         // Update dashboard
//         updateRevenueDashboard();
//     }

//     function updateRevenueDashboard() {
//         totalRevenueElem.textContent = revenue.total.toFixed(2);
//         revenueBasicElem.textContent = revenue.basic.toFixed(2);
//         revenuePremiumElem.textContent = revenue.premium.toFixed(2);
//         revenueExecutiveElem.textContent = revenue.executive.toFixed(2);
//         revenueTeamElem.textContent = revenue.team.toFixed(2);
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const desksContainer = document.getElementById('desks-container');
    const deskTypeSelect = document.getElementById('desk-type');
    const membershipTierSelect = document.getElementById('tier');
    const hoursInput = document.getElementById('hours');
    const bookForm = document.getElementById('booking-form');
    
    const totalRevenueElem = document.getElementById('total-revenue');
    const revenueBasicElem = document.getElementById('revenue-basic');
    const revenuePremiumElem = document.getElementById('revenue-premium');
    const revenueExecutiveElem = document.getElementById('revenue-executive');
    const revenueTeamElem = document.getElementById('revenue-team');

    const deskPrices = {
        basic: 10,
        premium: 15,
        executive: 20,
        team: 25
    };

    const revenue = {
        total: 0,
        basic: 0,
        premium: 0,
        executive: 0,
        team: 0
    };

    const desks = [];

    // Initialize desks
    for (let i = 1; i <= 15; i++) {
        const desk = document.createElement('div');
        desk.classList.add('desk');
        desk.classList.add(i <= 10 ? 'individual' : 'team');
        desk.textContent = i;
        desks.push(desk);
        desksContainer.appendChild(desk);
    }

    // Update membership tier visibility based on desk type
    deskTypeSelect.addEventListener('change', () => {
        membershipTierSelect.parentElement.style.display = deskTypeSelect.value === 'team' ? 'none' : 'block';
    });

    // Handle booking form submission
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const deskType = deskTypeSelect.value;
        const tier = deskType === 'individual' ? membershipTierSelect.value : null;
        const hours = parseInt(hoursInput.value);

        if (isNaN(hours) || hours <= 0) {
            alert('Please enter a valid number of hours.');
            return;
        }

        let availableDesk = null;
        for (let desk of desks) {
            if (!desk.classList.contains('booked') && desk.classList.contains(deskType)) {
                availableDesk = desk;
                break;
            }
        }

        if (!availableDesk) {
            alert(`No available ${deskType} desks.`);
            return;
        }

        let pricePerHour = deskPrices[tier || 'team'];
        let totalCharge = pricePerHour * hours;
        if (hours > 3) {
            totalCharge *= 0.9;
        }

        alert(`Desk ${availableDesk.textContent} booked for ${hours} hours. Total charge: $${totalCharge.toFixed(2)}`);
        availableDesk.classList.add('booked');

        // Update revenue
        revenue.total += totalCharge;
        if (tier) {
            revenue[tier] += totalCharge;
        } else {
            revenue.team += totalCharge;
        }

        // Update dashboard
        updateRevenueDashboard();
    });

    function updateRevenueDashboard() {
        totalRevenueElem.textContent = revenue.total.toFixed(2);
        revenueBasicElem.textContent = revenue.basic.toFixed(2);
        revenuePremiumElem.textContent = revenue.premium.toFixed(2);
        revenueExecutiveElem.textContent = revenue.executive.toFixed(2);
        revenueTeamElem.textContent = revenue.team.toFixed(2);
    }
});
