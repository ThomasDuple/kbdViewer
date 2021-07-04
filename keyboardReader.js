var layout = {};
var spacebars = {};
var var_size = "100";
var var_layout = "qwerty";
var space_bar_layout = 0;
var font = 'Arial';
var col_case = "#ffffff";
var col_keycaps = "#ffffff";
var col_text = "#000000";
var col_border = "#000000";

var dim = "3D";

fetch("./layouts/spacebar.json")
        .then(rep => rep.json())
        .then(data => {
            spacebars = data;
        });

var canvas = document.getElementById('Canvas2D');

function draw() {
    if (dim == "2D") {
        canvas.style.display = "block";
        document.getElementById('Canvas3D').style.display = "none";
        const u = (document.body.clientWidth * 0.85 - document.getElementById("menu").clientWidth) / layout.width;
        const spacing = 0.03 * u;
        canvas.width = (layout.width+1)*u;
        canvas.height = (layout.height+1)*u;
        var ctx = canvas.getContext('2d');
        ctx.font = (0.2 * u) + "px " + font;
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
                    case "SPACE_ROW":
                        var space_row = spacebars[space_bar_layout].row;
                        for (let k = 0; k < space_row.length; k++) {
                            space_key = space_row[k]
                            drawKey(ctx, u, x*u+spacing, y*u+spacing, space_key.width*u-(2*spacing), space_key.height*u-(2*spacing), space_key.text[0]);
                            x += space_key.width;
                        }
                        break;
                    case "ISO_ENTER":
                        ctx.beginPath();
                        ctx.strokeStyle = col_border;
                        ctx.lineWidth = 0.02 * u;
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
                        ctx.fillStyle = col_text;
                        ctx.fillText(key.text[0], (x+(0.5*key.width))*u, (y+(0.55*key.height))*u);
                        x += key.width;
                        break;
                    default:
                        drawKey(ctx, u, x*u+spacing, y*u+spacing, key.width*u-(2*spacing), key.height*u-(2*spacing), key.text[0]);
                        x += key.width;
                }
            }
            y += 1
        }      
    } else {
        canvas.style.display = "none";
        document.getElementById('Canvas3D').style.display = "block";
        const u = 5;
        const spacing = 0.03 * u;
        var y = 0;

        for (let i = 0; i < layout.rows.length; i++) {
            
            if (layout.rows[i].margin_top !== undefined) y += layout.rows[i].margin_top;
            var x = 0;
            var row = layout.rows[i].row;
            for (let j = 0; j < row.length; j++) {
                var key = row[j];
                if (key.margin_left !== undefined) x += key.margin_left;
                switch (key.type) {
                    case "SPACE_ROW":
                        var space_row = spacebars[space_bar_layout].row;
                        for (let k = 0; k < space_row.length; k++) {
                            space_key = space_row[k]
                            x += space_key.width;
                            //drawKey(ctx, u, x*u+spacing, y*u+spacing, space_key.width*u-(2*spacing), space_key.height*u-(2*spacing), space_key.text[0]);
                            //renderkey(x*u+spacing+(space_key.width/2*u),y*u+spacing+(space_key.height/2*u), space_key.width*u-(2*spacing),space_key.height*u-(2*spacing),space_key.text[0]);
                        }
                        break;
                    case "ISO_ENTER":
                        // TODO
                        break;
                    default:
                        //drawKey(ctx, u, x*u+spacing, y*u+spacing, key.width*u-(2*spacing), key.height*u-(2*spacing), key.text[0]);
                        
                        renderkey(x*u+spacing+(key.width/2*u),y*u+spacing+(key.height/2*u), key.width*u-(2*spacing),key.height*u-(2*spacing),key.text[0]);
                       
                        x += key.width;
                }
            }
            y += 1
        }      
    }
}

function drawKey(ctx, u, x, y, w, h, txt) {
    ctx.beginPath();
    ctx.strokeStyle = col_border;
    ctx.lineWidth = 0.02 * u;
    ctx.rect(x, y, w, h)
    ctx.fillStyle = col_keycaps;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = col_text;
    ctx.fillText(txt, w/2+x, h*0.55+y);
    
}

function loadLayout() {
    fetch("./layouts/" + var_size + "-" + var_layout + ".json")
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

document.getElementById("sel_size").addEventListener('change', () => {
    var_size = document.getElementById("sel_size").value;
    if (var_size >= 80) {
        document.getElementById("sel_spacebar").removeAttribute("disabled");
    } else {
        document.getElementById("sel_spacebar").setAttribute("disabled", true);
    }
    loadLayout();
});

document.getElementById("sel_layout").addEventListener('change', () => {
    var_layout = document.getElementById("sel_layout").value;
    loadLayout();
});

document.getElementById("sel_spacebar").addEventListener('change', () => {
    space_bar_layout = document.getElementById("sel_spacebar").value;
    loadLayout();
});

document.getElementById("dim_toggle").addEventListener('change', () => {
    dim = document.getElementById("dim_toggle").checked ? "3D" : "2D";
    loadLayout();
});

window.addEventListener('resize', draw);

loadLayout();
