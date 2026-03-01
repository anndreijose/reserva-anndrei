document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Carregar reservas salvas ou começar vazio
    var reservasSalvas = JSON.parse(localStorage.getItem('reservas')) || [];

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        selectable: true,
        events: reservasSalvas, // Carrega as datas salvas

        select: function(info) {
            var nome = prompt("Quem vai ficar no apê?");
            var cama = prompt("Qual cama? (Digite 1 ou 2)");

            if (nome && (cama === '1' || cama === '2')) {
                var novoEvento = {
                    title: nome + " (Cama " + cama + ")",
                    start: info.startStr,
                    end: info.endStr,
                    className: 'cama-' + cama
                };

                // Adiciona no calendário visualmente
                calendar.addEvent(novoEvento);

                // Salva no "banco de dados" do navegador
                reservasSalvas.push(novoEvento);
                localStorage.setItem('reservas', JSON.stringify(reservasSalvas));
                
                alert("Reserva confirmada para " + nome + "!");
            }
            calendar.unselect();
        }
    });

    calendar.render();
});