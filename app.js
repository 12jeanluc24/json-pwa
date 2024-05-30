$(document).ready(function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    loadHome();

    $('#home-tab').click(function() {
        loadHome();
    });
    $('#gallery-tab').click(function() {
        loadGallery();
    });
    $('#about-tab').click(function() {
        loadAbout();
    });

    function loadHome() {
        $('#content').html('<h2>Loading...</h2>');
        $.getJSON('https://jsonplaceholder.typicode.com/users', function(users) {
            let html = `
                <div class="card">
                    <div class="card-header">
                        Users
                    </div>
                    <div class="card-body">
                        <ul class="list-group">`;
            users.forEach(user => {
                html += `<li class="list-group-item">${user.name} - ${user.email}</li>`;
            });
            html += `
                        </ul>
                    </div>
                </div>`;
            $('#content').html(html);
        });
    }

    function loadGallery() {
        $('#content').html('<h2>Loading...</h2>');
        $.getJSON('https://jsonplaceholder.typicode.com/photos', function(photos) {
            let html = `
                <div class="card">
                    <div class="card-header">
                        Gallery
                    </div>
                    <div class="card-body">
                        <div class="row">`;
            photos.slice(0, 20).forEach(photo => { 
                html += `
                    <div class="col-md-3">
                        <div class="card mb-4">
                            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                            <div class="card-body">
                                <h5 class="card-title">${photo.title}</h5>
                            </div>
                        </div>
                    </div>`;
            });
            html += `
                        </div>
                    </div>
                </div>`;
            $('#content').html(html);
        });
    }

    function loadAbout() {
        $('#content').html('<h2>Loading...</h2>');
        
        const developerInfo = {
            name: "Malijan, Jean Luc Izach S.",
            email: "lucmalijan00@gmail.com",
            address: "San Pablo City, Laguna",
            bio: "Hi, I'm a student in Laguna State Pulytechnic University (LSPU) currently taking Information Technology Major in Web and Mobile Application Development."
        };
    
        const html = `
            <div class="card">
                <div class="card-header">
                    About
                </div>
                <div class="card-body">
                
                    <p>Name: ${developerInfo.name}</p>
                    <p>Email: ${developerInfo.email}</p>
                    <p>Address: ${developerInfo.address}</p>
                    <p>Bio: ${developerInfo.bio}</p>
                </div>
            </div>`;
        $('#content').html(html);
    }
    
});
