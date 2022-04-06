function getColor(stock) {
    if(stock ==="BNTX"){
        return 'RGBA(166,43,158,0.7)'
    }
    if(stock==="DIS"){
        return 'RGBA(18,4,209, 0.7)'
}
    if(stock==="MSFT"){
        return 'RGBA(209,4,25,0.7)'
    }
    if (stock==="GME"){
        return 'RGBA(61,161,61,0.7)'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b46bb93ab806400dbc1f38ecd7f8fdf4')
    const result = await response.json();

    const {BNTX ,MSFT,GME,DIS } = result;
    const stocks = [BNTX , MSFT,GME,DIS];
    console.log(stocks)
    stocks.forEach(stock =>stock.values.reverse());

    new Chart (timeChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            label:stocks.map(stock=>stock.meta.symbol),
            datasets:[{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findLargest(stock.values)
                ))
            }]
        }
    })
};

function findLargest(values) {
    var largestValue = 0;
    
    values.forEach(value => {
        if(parseFloat(value.high) > largestValue)
            largestValue = value.high
    })
    return largestValue;
};
main()
