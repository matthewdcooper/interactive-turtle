window.onload = function() {
    window.cnv = document.getElementById("canvas");
    window.ctx = cnv.getContext("2d");
    window.t = new Turtle(new Vector(200, 200), palette['black']);

    ctx.fillStyle = palette['white'];
    ctx.rect(0, 0, cnv.width, cnv.height);
    ctx.fill();

    setInterval(function() {
        t.update();
        t.draw();

    }, 1000/30);

    const inp_command = document.getElementById("inp_command");
    const ta_editor = document.getElementById("ta_editor");

    parser = new Parser(t);

    inp_command.onkeyup = function(event) {
        if (event.key === "Enter") {
            const command = inp_command.value;
            parser.parse(command)();
            ta_editor.value += command + "\n"; // but what if it was an error?
            inp_command.value = "";
        }

    };

}