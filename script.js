$(document).ready(function () {

    $('#menu-bar').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll', function () {

        $('#menu-bar').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        $('section').each(function () {

            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offset = $(this).offset().top - 200;

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.list .btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let src = $(this).attr('data-src');
        $('.menu .row .image img').attr('src', src);
    });

});

//appwrite
const client = new Appwrite.Client();
const account = new Appwrite.Account(client);
const database = new Appwrite.Databases(client);

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("679c9c47003bf6c55300") // Your project ID

async function submitForm(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="Your Name"]').value;
    const phoneNumber = document.querySelector('input[name="Phone Number"]').value;
    const email = document.querySelector('input[name="Your Email"]').value;
    const persons = parseInt(document.querySelector('select').value);
    const date = document.querySelector('input[type="date"]').value;

    // Create the data object with field names matching your Appwrite collection schema
    const data = {
        Name: name,
        Phone: phoneNumber,
        email: email,
        person: persons,
        date: date,
    };

    console.log(data); // Log the data object for debugging

    try {
        await database.createDocument("679c9cea00097cb05491", "679c9cfe00050a6de2e2", "unique()", data);
        alert("Form submitted successfully!");

        // Clear the form fields
        document.querySelector('input[name="Your Name"]').value = '';
        document.querySelector('input[name="Phone Number"]').value = '';
        document.querySelector('input[name="Your Email"]').value = '';
        document.querySelector('select').value = '';
        document.querySelector('input[type="date"]').value = '';
    } catch (error) {
        console.error(error);
        alert("Failed to submit form.");
    }
}

document.querySelector("form").addEventListener("submit", submitForm);
