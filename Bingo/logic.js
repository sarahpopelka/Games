document.addEventListener('DOMContentLoaded', (event) => {
    const choices = {
        'B': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        'I': [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        'N': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        'G': [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        'O': [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
    }

    var board = {}

    const letters = Object.keys(choices)

    getBoardData = new Promise(function (resolve, reject) {
        console.log('Getting Data')
        letters.forEach(e => board[e] = choose(e))
        resolve(board)
    })

    getBoardData.then(function (data) {
        console.log('Generating Table')
        console.log(d3.select("#bingo-board"))
        console.log(data)
        table = d3.select("table")
        console.log(table)
        table.append('thead')
            .append("tr")
            .selectAll("th")
            .data(letters)
            .enter()
            .append("th")
            .text(function (d) { return d })
        table.append("tbody")
            .selectAll("tr")
            .data(function (data) {
                dlist = []
                for (let i = 0; i < 5; i++) {
                    ddict = {
                        'B': board['B'][i],
                        'I': board['I'][i],
                        'N': board['N'][i],
                        'G': board['G'][i],
                        'O': board['O'][i]
                    }
                    if (i == 2) {
                        ddict['N'] = 'Free'
                    }
                    dlist.push(ddict)
                }
                console.log(dlist)
                return dlist
            })
            .enter()
            .append("tr")
            .selectAll("td")
            .data(function (row) {
                return letters.map(function (column) {
                    return { column: column, value: row[column] };
                });
            })
            .enter()
            .append("td")
            .html(function (d) {
                if (d.value == 'Free') {
                    inner = `<path transform="translate(25,25)" fill="none" stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                `}
                else {
                    if (d.value>9) {
                        inner = '<text x="28" y="65" class="small">' + d.value + '</text>'
                    }
                    else {
                        inner = '<text x="40" y="65" class="small">' + d.value + '</text>'
                    }
                }
                return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
            <circle stroke="none" stroke-width="5px" fill="none" cx="50" cy="50" r="48"/>
          ` + inner + '</svg>'
            })
    })
    .then(function(result){
        console.log(d3.selectAll("td"))
        d3.selectAll("td").on("click", function(d){
            circle=d3.select(this).select("circle")
            if (circle.style("fill")=="none"){
                circle
                .attr("fill", "#99FFFF")
                .attr("stroke", "#00FFFF" )
            }
            else{
                circle
                .attr("fill", "none")
                .attr("stroke", "none" )
            }
        })
    })

    function choose(e) {
        nums = []
        while (nums.length < 5) {
            //for(let i=0;i<6;i++){
            ind = Math.floor(Math.random() * 15)
            console.log(ind)
            choice = choices[e][ind]
            console.log(choice)
            if (!nums.includes(choice)) {
                nums.push(choice)
            }
        }
        return nums
    }
})