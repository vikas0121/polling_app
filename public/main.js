const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=OS]:checked').value;
    const data = { os: choice };
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    e.preventDefault();
});

let dataPoints = [
    { label: 'windows', y: 0 },
    { label: 'kali', y: 0 },
    { label: 'ubuntu', y: 0 },
];
const chartContainer = document.querySelector('#chartContainer');

if (chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('0bb466869b1cbde103be', {
      cluster: 'ap2',
      encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(x => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
    });
}