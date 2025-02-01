document.addEventListener('DOMContentLoaded', () => {
    // JSON data for destinations and activities
    const destinationsData = {
        "Munnar": {
            "activities": {
                "sunny": [{
                        "time": "07:00 - 09:00",
                        "activity": "Tea plantation visit",
                        "description": "Start your day early with a refreshing walk through lush tea gardens. Learn about tea cultivation and enjoy the misty morning views."
                    },
                    {
                        "time": "09:30 - 12:30",
                        "activity": "Trekking",
                        "description": "Guided trek through the Western Ghats. Experience diverse flora and stunning valley views. Includes packed snacks and water."
                    },
                    {
                        "time": "14:00 - 16:00",
                        "activity": "Visit to Eravikulam National Park",
                        "description": "Discover the wildlife and scenic views of the Eravikulam National Park. Famous for its endangered species, Nilgiri Tahr."
                    },
                    {
                        "time": "16:30 - 18:00",
                        "activity": "Sunset view at Echo Point",
                        "description": "Watch the mesmerizing sunset and enjoy the echo phenomena at Echo Point."
                    }
                ],
                "rainy": [{
                        "time": "09:00 - 11:00",
                        "activity": "Tea Museum",
                        "description": "Explore the history of tea cultivation in Kerala. Includes tea tasting session and documentary screening."
                    },
                    {
                        "time": "11:30 - 13:00",
                        "activity": "Spice Garden Visit",
                        "description": "Learn about the spices of Kerala with a guided tour through a spice garden. Includes spice tasting."
                    },
                    {
                        "time": "14:00 - 16:00",
                        "activity": "Indoor crafts workshop",
                        "description": "Participate in a local crafts workshop where you can create souvenirs to take home."
                    }
                ]
            },
            "costs": {
                "budget": 1500,
                "moderate": 3000,
                "luxury": 5000
            },
            "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=2069"
        }
    };

    // Handling the general itinerary generation
    document.getElementById('generate').addEventListener('click', () => {
        const destination = document.getElementById('destination').value;
        const days = parseInt(document.getElementById('days').value);
        const budget = document.getElementById('budget').value;
        const weather = document.getElementById('weather').value;

        if (destination && days && budget && weather) {
            // Check if the destination exists in the JSON data
            if (destinationsData[destination]) {
                const destinationData = destinationsData[destination];
                const activities = destinationData.activities[weather] || [];
                const costs = destinationData.costs;
                const imageUrl = destinationData.image;

                // Build the itinerary content dynamically
                let itineraryContent = `
                  <h3>Your ${days}-day itinerary for ${destination}:</h3>
                  <p>Budget: ${budget}</p>
                  <p>Weather: ${weather}</p>
                  <p>Estimated Costs: ${costs[budget.toLowerCase()] || 'N/A'} INR</p>
                  <img src="${imageUrl}" alt="${destination}" style="max-width: 100%; height: auto; margin-top: 20px;" />
                  <h4>Day-by-Day Activities:</h4>
              `;

                if (activities.length > 0) {
                    // Split activities for the number of days
                    const activitiesPerDay = Math.ceil(activities.length / days);

                    for (let day = 1; day <= days; day++) {
                        itineraryContent += `<h5>Day ${day}:</h5>`;
                        const startIdx = (day - 1) * activitiesPerDay;
                        const endIdx = startIdx + activitiesPerDay;

                        const dayActivities = activities.slice(startIdx, endIdx);
                        if (dayActivities.length > 0) {
                            dayActivities.forEach(activity => {
                                itineraryContent += `
                                  <div>
                                      <h6>${activity.time} - ${activity.activity}</h6>
                                      <p>${activity.description}</p>
                                  </div>
                              `;
                            });
                        } else {
                            itineraryContent += `<p>No activities available for this day.</p>`;
                        }
                    }
                } else {
                    itineraryContent += `<p>No activities available for this weather.</p>`;
                }

                // Set the itinerary content in the DOM
                document.getElementById('itinerary').innerHTML = itineraryContent;
            } else {
                document.getElementById('itinerary').innerHTML = '<p>No data available for the selected destination.</p>';
            }
        } else {
            alert('Please fill all the fields to generate your itinerary.');
        }
    });

    // Handling the mood-based itinerary generation
    document.getElementById('generate-mood').addEventListener('click', () => {
        const mood = document.getElementById('mood').value;
        const moodDestination = document.getElementById('mood-destination').value;
        const moodDays = parseInt(document.getElementById('mood-days').value);

        if (mood && moodDestination && moodDays) {
            // Check if the destination exists in the JSON data
            if (destinationsData[moodDestination]) {
                const moodData = destinationsData[moodDestination];
                const weather = 'sunny'; // Default for mood; you can modify this
                const activities = moodData.activities[weather] || [];
                const imageUrl = moodData.image;

                // Build the itinerary content dynamically for the mood
                let moodItineraryContent = `
                  <h3>Your ${moodDays}-day ${mood} itinerary for ${moodDestination}:</h3>
                  <p>Mood: ${mood}</p>
                  <img src="${imageUrl}" alt="${moodDestination}" style="max-width: 100%; height: auto; margin-top: 20px;" />
                  <h4>Day-by-Day Activities:</h4>
              `;

                if (activities.length > 0) {
                    // Split activities for the number of days
                    const activitiesPerDay = Math.ceil(activities.length / moodDays);

                    for (let day = 1; day <= moodDays; day++) {
                        moodItineraryContent += `<h5>Day ${day}:</h5>`;
                        const startIdx = (day - 1) * activitiesPerDay;
                        const endIdx = startIdx + activitiesPerDay;

                        const dayActivities = activities.slice(startIdx, endIdx);
                        if (dayActivities.length > 0) {
                            dayActivities.forEach(activity => {
                                moodItineraryContent += `
                                  <div>
                                      <h6>${activity.time} - ${activity.activity}</h6>
                                      <p>${activity.description}</p>
                                  </div>
                              `;
                            });
                        } else {
                            moodItineraryContent += `<p>No activities available for this day.</p>`;
                        }
                    }
                } else {
                    moodItineraryContent += `<p>No activities available for this mood and weather.</p>`;
                }

                // Set the mood itinerary content in the DOM
                document.getElementById('itinerary').innerHTML = moodItineraryContent;
            } else {
                document.getElementById('itinerary').innerHTML = '<p>No data available for the selected destination.</p>';
            }
        } else {
            alert('Please fill all the fields to generate your mood-based itinerary.');
        }
    });
});