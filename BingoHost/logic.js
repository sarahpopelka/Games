document.addEventListener('DOMContentLoaded', (event) => {
    const choices = {
        'B': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        'I': [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        'N': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        'G': [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        'O': [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
    }

    var chosen = []

    const letters = Object.keys(choices)

    const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    table = d3.select("table")
    table.append("tbody")
        .selectAll("tr")
        .data(function (data) {
            dlist = []
            letters.forEach(function (k) {
                ddict = { 0: k }
                for (var i = 0; i < columns.length - 1; i++) {
                    ddict[i + 1] = k + choices[k][i]
                }
                dlist.push(ddict)
            })
            console.log(dlist)
            return dlist
        })
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append("td")
        .html(function (d) {
            if (d.column == 0) {
                if (d.value == 'I') {
                    inner = '<text x="40" y="65" class="BINGO">' + d.value + '</text>'
                }
                else {
                    inner = '<text x="30" y="65" class="BINGO">' + d.value + '</text>'
                }
            }
            else if (d.value.length < 3) {
                inner = '<text x="35" y="65" class="small">' + d.value.slice(1) + '</text>'
            }
            else {
                inner = '<text x="30" y="65" class="small">' + d.value.slice(1) + '</text>'
            }
            return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
        <circle id="`+ d.value + `" stroke="none" stroke-width="5px" fill="none" cx="50" cy="50" r="48"/>
      ` + inner + '</svg>'
        })

    d3.select("#cage").on("click", function (d) {
        const clength = chosen.length
        while (clength == chosen.length) {
            l = Math.floor(Math.random() * 5)
            ind = Math.floor(Math.random() * 15)
            letter = letters[l]
            choice = letter + choices[letter][ind]
            console.log(choice)
            if (!chosen.includes(choice)) {
                chosen.push(choice)
            }
        }
        ball = d3.select("#ball")
        ball.text(choice)
        if (choice.length < 3) {
            if(letter=="I"){
                ball.attr("x","32")
            }
            else{
            ball.attr("x", "25")
            }
        }
        else {
            if(letter=="I"){
                ball.attr("x","22")
            }
            else{
            ball.attr("x", "15")
            }
        }
        console.log(d3.select("#" + choice))
        d3.select("#" + choice)
            .attr("fill", "#99FFFF")
            .attr("stroke", "#00FFFF")
    })
    // getBoardData = new Promise(function (resolve, reject) {
    //     console.log('Getting Data')
    //     letters.forEach(e => board[e] = choose(e))
    //     resolve(board)
    // })

    // getBoardData.then(function (data) {
    //     console.log('Generating Table')
    //     console.log(d3.select("#bingo-board"))
    //     console.log(data)

    // })
    // .then(function(result){
    //     console.log(d3.selectAll("td"))
    //     d3.selectAll("td").on("click", function(d){
    //         circle=d3.select(this).select("circle")
    //         if (circle.style("fill")=="none"){
    //             circle
    //             .attr("fill", "#99FFFF")
    //             .attr("stroke", "#00FFFF" )
    //         }
    //         else{
    //             circle
    //             .attr("fill", "none")
    //             .attr("stroke", "none" )
    //         }
    //     })
    // })

    // function choose(e) {
    //     nums = []
    //     
    //         //for(let i=0;i<6;i++){
    //         ind = Math.floor(Math.random() * 15)
    //         console.log(ind)
    //         choice = choices[e][ind]
    //         console.log(choice)
    //         if (!nums.includes(choice)) {
    //             nums.push(choice)
    //         }
    //     }
    //     return nums
    // }
})