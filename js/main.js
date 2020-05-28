window.onload = function() {
    window.cnv = document.getElementById("canvas");
    window.ctx = cnv.getContext("2d");
    window.t = new Turtle(new Vector(200, 200), '#000');

    setInterval(function() {
        t.update();
        t.draw();

    }, 1000/30);

    const inp_command = document.getElementById("inp_command");
    const ta_editor = document.getElementById("ta_editor");

    inp_command.onkeyup = function(event) {
        if (event.key === "Enter") {
            const command = inp_command.value;
            const cmd = command.split(" ");
            if (cmd[0] === "move") t.move(parseInt(cmd[1]));
            if (cmd[0] === "turn") t.turn(parseInt(cmd[1]));
            ta_editor.value += command + "\n";
            inp_command.value = "";
        }

    };

}