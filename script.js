let icosahedron = document.querySelector(".icosahedron");

for (let i = 0; i < 20; i++) {
    icosahedron.innerHTML +=
        `<figure class="face" id="face${i}"><img src="https://i.ytimg.com/vi/qnqeNSFQOe4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgSigsMA8=&rs=AOn4CLBc1in5R223X0YAssJi5aXzMHKpNw"></figure>`;
}
