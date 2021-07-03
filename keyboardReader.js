var layout = {};
var font = 'Arial';
var col_case = "#ffffff";
var col_keycaps = "#ffffff";
var col_text = "#000000";
var col_border = "#000000";

var canvas = document.getElementById('canvas');

function draw() {
    const u = 50;
    const spacing = 0.03 * u;
    canvas.width = (layout.width+1)*u;
    canvas.height = (layout.height+1)*u;
    var ctx = canvas.getContext('2d');
    ctx.font = "10px " + font;
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.background = col_case;

    var y = 0.5;
    for (let i = 0; i < layout.rows.length; i++) {
        
        if (layout.rows[i].margin_top !== undefined) y += layout.rows[i].margin_top;
        var x = 0.5;
        var row = layout.rows[i].row;
        for (let j = 0; j < row.length; j++) {
            var key = row[j];
            if (key.margin_left !== undefined) x += key.margin_left;
            switch (key.type) {
                case "ISO_ENTER":
                    ctx.beginPath();
                    ctx.strokeStyle = col_border;
                    ctx.lineWidth = 0.03 * u;
                    ctx.moveTo(x*u+spacing, y*u+spacing);
                    ctx.lineTo(x*u+spacing, y*u+spacing + (u - 2*spacing));
                    ctx.lineTo(x*u+spacing + (0.25*u), y*u+spacing + (u - 2*spacing));
                    ctx.lineTo(x*u+spacing + (0.25*u), y*u+spacing + (2*u - 2*spacing));
                    ctx.lineTo(x*u+spacing + (1.5*u - 2*spacing), y*u+spacing + (2*u - 2*spacing));
                    ctx.lineTo(x*u+spacing + (1.5*u - 2*spacing), y*u+spacing);
                    ctx.lineTo(x*u+spacing, y*u+spacing);
                    ctx.fillStyle = col_keycaps;
                    ctx.fill();
                    ctx.stroke();
                    break;
                default:
                    ctx.beginPath();
                    ctx.strokeStyle = col_border;
                    ctx.lineWidth = 0.02 * u;
                    ctx.rect(x*u+spacing, y*u+spacing, key.width*u-(2*spacing), key.height*u-(2*spacing));
                    ctx.fillStyle = col_keycaps;
                    ctx.fill();
                    ctx.stroke();
            }
            ctx.fillStyle = col_text;
            ctx.fillText(key.text[0], (x+(0.5*key.width))*u, (y+(0.55*key.height))*u);
            x += key.width;
        }
        y += 1
    }
}


function loadLayout(name) {
    fetch("./layouts/" + name + ".json")
        .then(rep => rep.json())
        .then(data => {
            layout = data;
            draw();
        });
}


document.getElementById("sel_font").addEventListener('change', () => {
    font = document.getElementById("sel_font").value;
    draw();
});

document.getElementById("ipt_color_case").addEventListener('change', () => {
    col_case = document.getElementById("ipt_color_case").value;
    draw();
});

document.getElementById("ipt_color_kc").addEventListener('change', () => {
    col_keycaps = document.getElementById("ipt_color_kc").value;
    draw();
});

document.getElementById("ipt_color_txt").addEventListener('change', () => {
    col_text = document.getElementById("ipt_color_txt").value;
    draw();
});

document.getElementById("ipt_color_bd").addEventListener('change', () => {
    col_border = document.getElementById("ipt_color_bd").value;
    draw();
});

document.getElementById("sel_layout").addEventListener('change', () => {
    loadLayout(document.getElementById("sel_layout").value);
});

loadLayout("75-qwerty");