document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const startButton = document.getElementById('start-button');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.getElementById('score');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    const NUM_QUESTIONS_PER_CATEGORY = 4; // Define el número de preguntas por categoría
    const QUESTION_BANK_SIZE = 50; // Define el tamaño del banco de preguntas por categoría (para validación)

    // Definir las preguntas por categoría (BANCO DE 50 PREGUNTAS POR CATEGORÍA)
    const allQuestions = {
        artes: [
                {
                    "question": "¿Quién pintó 'La noche estrellada'?",
                    "options": ["Claude Monet", "Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué movimiento artístico se caracteriza por la representación de la realidad de forma exagerada y distorsionada?",
                    "options": ["Impresionismo", "Cubismo", "Expresionismo", "Surrealismo"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál de estos artistas es conocido por sus esculturas móviles?",
                    "options": ["Henry Moore", "Alexander Calder", "Alberto Giacometti", "Constantin Brâncuși"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Dónde se encuentra la Mona Lisa?",
                    "options": ["Museo Británico", "Museo del Prado", "Museo del Louvre", "Galería Uffizi"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué artista creó la serie de latas de sopa Campbell?",
                    "options": ["Roy Lichtenstein", "Andy Warhol", "Jasper Johns", "Robert Rauschenberg"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué estilo arquitectónico se caracteriza por sus arcos apuntados y bóvedas de crucería?",
                    "options": ["Románico", "Gótico", "Barroco", "Renacentista"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién esculpió el David?",
                    "options": ["Donatello", "Miguel Ángel", "Bernini", "Leonardo da Vinci"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué pintor español es famoso por sus pinturas negras?",
                    "options": ["Diego Velázquez", "Francisco de Goya", "El Greco", "Joan Miró"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué movimiento artístico buscaba representar el mundo de los sueños y el subconsciente?",
                    "options": ["Dadaísmo", "Surrealismo", "Futurismo", "Constructivismo"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién diseñó la cúpula de la Basílica de San Pedro en el Vaticano?",
                    "options": ["Rafael", "Bramante", "Miguel Ángel", "Brunelleschi"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué artista mexicano es conocido por sus murales?",
                    "options": ["Frida Kahlo", "Diego Rivera", "David Alfaro Siqueiros", "Rufino Tamayo"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué es el sfumato?",
                    "options": ["Una técnica de grabado", "Una técnica de pintura que difumina los contornos", "Un tipo de escultura", "Un estilo arquitectónico"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué periodo artístico se caracteriza por el uso de colores brillantes y contrastantes?",
                    "options": ["Renacimiento", "Barroco", "Rococó", "Fauvismo"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Quién pintó 'El Guernica'?",
                    "options": ["Salvador Dalí", "Joan Miró", "Pablo Picasso", "Juan Gris"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué civilización antigua construyó las pirámides de Giza?",
                    "options": ["Griega", "Romana", "Egipcia", "Mesopotámica"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué artista creó la fuente 'Fontaine' usando un urinario?",
                    "options": ["Marcel Duchamp", "Man Ray", "Francis Picabia", "Hans Arp"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuál es la capital del arte renacentista?",
                    "options": ["Roma", "Venecia", "Florencia", "Milán"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué pintor impresionista capturó escenas de bailarinas?",
                    "options": ["Claude Monet", "Edgar Degas", "Pierre-Auguste Renoir", "Camille Pissarro"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué es un fresco?",
                    "options": ["Un tipo de escultura en bronce", "Una técnica de pintura mural", "Un tipo de cerámica", "Un tipo de tapiz"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién pintó 'Las Meninas'?",
                    "options": ["El Greco", "Francisco de Goya", "Diego Velázquez", "Bartolomé Esteban Murillo"],
                    "correctAnswer": 2
                },
                {
                   "question": "¿Qué tipo de arte se caracteriza por su naturaleza efímera y su interacción con el entorno?",
                   "options": ["Arte conceptual", "Land Art", "Arte povera", "Arte minimalista"],
                   "correctAnswer": 1
                },
                {
                    "question": "¿Cuál de estas obras no pertenece al arte gótico?",
                    "options": ["Catedral de Notre Dame", "Vidrieras de Chartres", "La Gioconda", "Esculturas de Reims"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿A qué artista se asocia el término 'action painting'?",
                    "options": ["Jackson Pollock", "Mark Rothko", "Barnett Newman", "Clyfford Still"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué arte precolombino destaca por sus geoglifos?",
                    "options": ["Maya", "Inca", "Nazca", "Azteca"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué material es característico de las esculturas de Henry Moore?",
                    "options": ["Bronce", "Mármol", "Madera", "Piedra"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Qué artista es conocido por sus composiciones geométricas y el uso de colores primarios?",
                    "options": ["Piet Mondrian", "Kazimir Malevich", "Wassily Kandinsky", "Theo van Doesburg"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿En qué museo se encuentra la Venus de Milo?",
                    "options": ["Museo Británico", "Museo del Louvre", "Museo Vaticano", "Galería Uffizi"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué es un tríptico?",
                    "options": ["Una escultura de tres figuras", "Una pintura dividida en tres paneles", "Un tipo de mosaico", "Un tipo de tapiz"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué artista es conocido por sus esculturas de arañas gigantes?",
                    "options": ["Louise Bourgeois", "Eva Hesse", "Yayoi Kusama", "Rebecca Horn"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuál de estos movimientos artísticos surgió como una reacción a la Primera Guerra Mundial?",
                    "options": ["Futurismo", "Dadaísmo", "Surrealismo", "Constructivismo"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué técnica utiliza Georges Seurat?",
                    "options": ["Sfumato", "Puntillismo", "Chiaroscuro", "Frottage"],
                    "correctAnswer": 1
                },
               {
                   "question": "¿Qué artista es famoso por pintar latas de sopa Campbell?",
                   "options": ["Andy Warhol", "Roy Lichtenstein", "Claes Oldenburg", "Jasper Johns"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué estilo arquitectónico se caracteriza por la ornamentación recargada y el uso de curvas?",
                   "options": ["Gótico", "Renacentista", "Barroco", "Neoclásico"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Quién fue el arquitecto principal del Museo Guggenheim de Bilbao?",
                   "options": ["Frank Lloyd Wright", "Le Corbusier", "Frank Gehry", "I.M. Pei"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué cultura se asocia con los guerreros de terracota?",
                   "options": ["Egipcia", "Griega", "China", "Romana"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué artista es famoso por sus autorretratos, incluyendo uno con un mono?",
                   "options": ["Diego Rivera", "Frida Kahlo", "José Clemente Orozco", "David Alfaro Siqueiros"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué es un mandala?",
                   "options": ["Un tipo de estatua budista", "Un diagrama cósmico simbólico", "Un instrumento musical indio", "Un tipo de tejido tradicional"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué movimiento artístico se caracteriza por la abstracción y la reducción a formas geométricas simples?",
                   "options": ["Surrealismo", "Cubismo", "Expresionismo abstracto", "Minimalismo"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Cuál de estas esculturas no fue hecha por Auguste Rodin?",
                   "options": ["El Pensador", "El Beso", "La Estatua de la Libertad", "Los Burgueses de Calais"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué artista es conocido por sus serigrafías de celebridades, como Marilyn Monroe?",
                   "options": ["Roy Lichtenstein", "Andy Warhol", "Jasper Johns", "Robert Rauschenberg"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el nombre del museo más grande del mundo?",
                   "options": ["Museo del Louvre", "Museo Británico", "Museo Metropolitano de Arte", "Museo del Hermitage"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿En qué país se encuentra la Capilla Sixtina?",
                   "options": ["Italia", "Francia", "España", "Grecia"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Quién es el autor de 'El jardín de las delicias'?",
                   "options": ["Jan van Eyck", "El Bosco", "Pieter Brueghel el Viejo", "Rogier van der Weyden"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿De qué periodo artístico es característico el uso de la perspectiva?",
                   "options": ["Renacimiento", "Barroco", "Gótico", "Románico"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Quién es el autor de la obra 'Las dos Fridas'?",
                   "options": ["Remedios Varo", "Leonora Carrington", "Frida Kahlo", "María Izquierdo"],
                   "correctAnswer": 2
                },
                {
                    "question": "¿A qué arquitecto se le atribuye la construcción de la ciudad de Brasilia?",
                    "options": ["Oscar Niemeyer", "Le Corbusier", "Frank Lloyd Wright", "Ludwig Mies van der Rohe"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué pintor fue el precursor del impresionismo?",
                    "options": ["Eugène Delacroix", "Gustave Courbet", "Édouard Manet", "Jean-François Millet"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué cultura se asocia con la creación de las cabezas colosales?",
                    "options": ["Maya", "Azteca", "Olmeca", "Zapoteca"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué tipo de arte es el origami?",
                    "options": ["Pintura", "Escultura", "Cerámica", "Papiroflexia"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Qué tipo de arte es el origami?",
                    "options": ["Pintura", "Escultura", "Cerámica", "Papiroflexia"],
                    "correctAnswer": 3
                }
            ],
        ciencia: [
                {
                    "question": "¿Cuál es el símbolo químico del oro?",
                    "options": ["Ag", "Au", "Fe", "Hg"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el planeta más grande del sistema solar?",
                    "options": ["Marte", "Júpiter", "Saturno", "Neptuno"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es la velocidad de la luz en el vacío?",
                    "options": ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuál es el nombre del proceso por el cual las plantas convierten la luz solar en energía?",
                    "options": ["Respiración", "Fotosíntesis", "Transpiración", "Fermentación"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el hueso más largo del cuerpo humano?",
                    "options": ["Fémur", "Tibia", "Húmero", "Peroné"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuál es el gas más abundante en la atmósfera terrestre?",
                    "options": ["Oxígeno", "Nitrógeno", "Argón", "Dióxido de carbono"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién formuló la teoría de la relatividad?",
                    "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es la unidad de medida de la fuerza en el Sistema Internacional de Unidades?",
                    "options": ["Julio", "Vatio", "Newton", "Amperio"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el proceso por el cual un líquido se convierte en gas?",
                    "options": ["Sublimación", "Fusión", "Evaporación", "Condensación"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué científico desarrolló la teoría de la evolución por selección natural?",
                    "options": ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "James Watson"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es la fórmula química del agua?",
                    "options": ["CO2", "NaCl", "H2O", "NH3"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué órgano del cuerpo humano produce insulina?",
                    "options": ["Hígado", "Riñón", "Páncreas", "Estómago"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la estrella más cercana a la Tierra?",
                    "options": ["Sirio", "Alfa Centauri", "Próxima Centauri", "Vega"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el nombre de la capa de ozono que protege la Tierra de la radiación ultravioleta?",
                    "options": ["Troposfera", "Estratosfera", "Mesosfera", "Termosfera"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué científico descubrió la penicilina?",
                    "options": ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el tipo de energía almacenada en los enlaces químicos?",
                    "options": ["Cinética", "Potencial", "Térmica", "Eléctrica"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué gas liberan las plantas durante la fotosíntesis?",
                    "options": ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Hidrógeno"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el planeta conocido como el 'planeta rojo'?",
                    "options": ["Venus", "Marte", "Júpiter", "Saturno"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es la unidad de medida de la resistencia eléctrica?",
                    "options": ["Voltio", "Amperio", "Ohmio", "Vatio"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué es la mitosis?",
                    "options": ["Un tipo de célula sexual", "Un proceso de división celular", "Un tipo de proteína", "Un orgánulo celular"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué científico propuso las leyes del movimiento?",
                    "options": ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el órgano encargado de bombear la sangre en el cuerpo humano?",
                    "options": ["Pulmones", "Hígado", "Cerebro", "Corazón"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Qué es un eclipse solar?",
                    "options": ["Cuando la Tierra se interpone entre el Sol y la Luna", "Cuando la Luna se interpone entre el Sol y la Tierra", "Cuando Marte se interpone entre el Sol y la Tierra", "Cuando Júpiter se interpone entre el Sol y la Tierra"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el nombre del proceso por el cual los sólidos pasan directamente a estado gaseoso?",
                    "options": ["Fusión", "Evaporación", "Sublimación", "Condensación"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué científico es conocido por sus estudios sobre la radiactividad?",
                    "options": ["Albert Einstein", "Isaac Newton", "Marie Curie", "Max Planck"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el componente principal de los huesos?",
                    "options": ["Calcio", "Hierro", "Potasio", "Sodio"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué es el ADN?",
                    "options": ["Un tipo de proteína", "Un tipo de azúcar", "El material genético de los seres vivos", "Un tipo de célula sanguínea"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la galaxia en la que se encuentra nuestro sistema solar?",
                    "options": ["Andrómeda", "Triángulo", "Vía Láctea", "Sombrero"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la función principal de los glóbulos rojos en la sangre?",
                    "options": ["Transportar oxígeno", "Combatir infecciones", "Coagular la sangre", "Transportar nutrientes"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué es un volcán?",
                    "options": ["Una montaña de hielo", "Una abertura en la corteza terrestre por donde emerge magma", "Un tipo de nube", "Un valle profundo"],
                    "correctAnswer": 1
                },
               {
                   "question": "¿Cuál es el valor aproximado de la aceleración debido a la gravedad en la superficie de la Tierra?",
                   "options": ["9.8 m/s²", "1.6 m/s²", "24 m/s²", "3.7 m/s²"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Cuál es la capa más externa de la Tierra?",
                   "options": ["Manto", "Núcleo", "Corteza", "Astenosfera"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué instrumento se utiliza para medir la presión atmosférica?",
                   "options": ["Termómetro", "Barómetro", "Higrómetro", "Anemómetro"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué científico es conocido por sus leyes de la herencia?",
                   "options": ["Charles Darwin", "Gregor Mendel", "James Watson", "Francis Crick"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el gas responsable del efecto invernadero en mayor medida?",
                   "options": ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Metano"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué son las neuronas?",
                   "options": ["Células musculares", "Células nerviosas", "Células sanguíneas", "Células epiteliales"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué es la fotosíntesis?",
                   "options": ["Proceso de respiración celular", "Proceso de conversión de luz en energía química", "Proceso de digestión", "Proceso de reproducción celular"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué elemento químico es esencial para la formación de huesos y dientes?",
                   "options": ["Hierro", "Sodio", "Calcio", "Potasio"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué astro es el satélite natural de la Tierra?",
                   "options": ["Venus", "Marte", "Luna", "Sol"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué unidad se usa para medir la energía?",
                   "options": ["Watt", "Joule", "Ampere", "Volt"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el proceso de transformación de un huevo en larva, pupa y finalmente adulto, como ocurre con las mariposas?",
                   "options": ["División celular", "Metamorfosis", "Gemación", "Regeneración"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué forma tienen las moléculas de ADN?",
                   "options": ["Círculo", "Espiral", "Hélice doble", "Cadena lineal"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el nombre del punto más bajo de la Tierra?",
                   "options": ["Monte Everest", "Fosa de las Marianas", "Gran Cañón", "Valle de la Muerte"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué instrumento óptico se usa para observar objetos muy pequeños, como células?",
                   "options": ["Telescopio", "Microscopio", "Prismáticos", "Lupa"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué tipo de energía produce el Sol?",
                   "options": ["Energía eólica", "Energía hidráulica", "Energía nuclear", "Energía geotérmica"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿A qué velocidad viaja el sonido en el aire (aproximadamente)?",
                   "options": ["343 m/s", "1500 m/s", "300000 km/s", "120 km/h"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué planeta del sistema solar es famoso por sus anillos?",
                   "options": ["Júpiter", "Marte", "Saturno", "Urano"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el nombre del proceso por el cual las plantas liberan agua a la atmósfera?",
                   "options": ["Respiración", "Transpiración", "Fotosíntesis", "Condensación"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es la rama de la biología que estudia los animales?",
                   "options": ["Botánica", "Zoología", "Microbiología", "Ecología"],
                   "correctAnswer": 1
               }
            ],
        deportes: [
                {
                    "question": "¿Cuántos jugadores hay en un equipo de baloncesto?",
                    "options": ["5", "7", "9", "11"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuál es el deporte en el que Michael Jordan es considerado una leyenda?",
                    "options": ["Fútbol", "Baloncesto", "Béisbol", "Golf"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuántos anillos olímpicos hay?",
                    "options": ["3", "4", "5", "6"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué deporte se juega en Wimbledon?",
                    "options": ["Golf", "Tenis", "Cricket", "Rugby"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué país se inventó el fútbol?",
                    "options": ["Brasil", "Inglaterra", "España", "Italia"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuántos sets necesita ganar un equipo de voleibol para ganar un partido?",
                    "options": ["2", "3", "4", "5"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué deporte se juega en el Super Bowl?",
                    "options": ["Fútbol", "Béisbol", "Baloncesto", "Fútbol americano"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es el nombre del torneo de tenis más prestigioso del mundo?",
                    "options": ["Roland Garros", "Abierto de Australia", "Wimbledon", "Abierto de Estados Unidos"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué deporte se destaca Usain Bolt?",
                    "options": ["Natación", "Atletismo", "Ciclismo", "Gimnasia"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuántos jugadores hay en un equipo de béisbol?",
                    "options": ["9", "10", "11", "12"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué deporte se juega en la NBA?",
                    "options": ["Fútbol", "Baloncesto", "Béisbol", "Golf"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el país de origen del karate?",
                    "options": ["China", "Corea", "Japón", "Tailandia"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuántos hoyos tiene un campo de golf estándar?",
                    "options": ["9", "12", "18", "21"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué deporte se juega en la Copa Ryder?",
                    "options": ["Tenis", "Golf", "Polo", "Esquí"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién es considerado el rey del fútbol?",
                    "options": ["Diego Maradona", "Lionel Messi", "Cristiano Ronaldo", "Pelé"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es el deporte en el que se utilizan raquetas y un volante?",
                    "options": ["Tenis", "Bádminton", "Squash", "Ping pong"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué deporte se practica en la Fórmula 1?",
                    "options": ["Motociclismo", "Automovilismo", "Ciclismo", "Esquí"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuántos jugadores hay en un equipo de hockey sobre hielo?",
                    "options": ["5", "6", "7", "8"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué deporte se juega en el Tour de Francia?",
                    "options": ["Atletismo", "Natación", "Ciclismo", "Esquí"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el nombre del estadio del FC Barcelona?",
                    "options": ["Santiago Bernabéu", "Camp Nou", "Wembley", "Old Trafford"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué deporte se practica en las Grandes Ligas?",
                    "options": ["Fútbol", "Baloncesto", "Béisbol", "Hockey"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿De qué país es originario el tenis de mesa?",
                    "options": ["China", "Japón", "Corea del Sur", "Vietnam"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Cuántos segundos tiene un período en un partido de baloncesto de la NBA?",
                    "options": ["10", "12", "15", "20"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué deporte destacó Michael Phelps?",
                    "options": ["Atletismo", "Natación", "Gimnasia", "Remo"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué significa la sigla FIFA?",
                    "options": ["Federación Internacional de Fútbol Asociación", "Federación Internacional de Fútbol Americano", "Federación Italiana de Fútbol Amateur", "Federación Internacional de Fútbol Atlético"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿En qué deporte se utilizan los términos 'strike' y 'spare'?",
                    "options": ["Billar", "Bolos", "Golf", "Tenis"],
                    "correctAnswer": 1
                },
               {
                   "question": "¿En qué deporte se utiliza un 'puck'?",
                   "options": ["Lacrosse", "Hockey sobre hielo", "Polo", "Cricket"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuántos puntos vale un touchdown en el fútbol americano?",
                   "options": ["3", "6", "7", "8"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué deporte se practica en el torneo de las Seis Naciones?",
                   "options": ["Fútbol", "Baloncesto", "Rugby", "Tenis"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el nombre del trofeo que se entrega al campeón de la NBA?",
                   "options": ["Stanley Cup", "Vince Lombardi Trophy", "Larry O'Brien Championship Trophy", "Claret Jug"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuántas bases hay en un campo de béisbol?",
                   "options": ["3", "4", "5", "6"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué estilo de natación se conoce como 'mariposa'?",
                   "options": ["Libre", "Espalda", "Braza", "Mariposa"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Qué deporte practica Rafael Nadal?",
                   "options": ["Golf", "Tenis", "Fútbol", "Baloncesto"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué ciudad se encuentran las oficinas centrales del Comité Olímpico Internacional?",
                   "options": ["Londres", "París", "Lausana", "Nueva York"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el deporte que se juega con un palo y una pequeña bola blanca en un campo de hierba?",
                   "options": ["Cricket", "Golf", "Hockey", "Polo"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué deporte se practica en la Copa América?",
                   "options": ["Béisbol", "Fútbol", "Baloncesto", "Tenis"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuántos jugadores hay en un equipo de voleibol de playa?",
                   "options": ["2", "4", "6", "8"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Cuál es el deporte que se practica con caballos y un mazo para golpear una pelota?",
                   "options": ["Golf", "Polo", "Lacrosse", "Hockey"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué deporte se practica en la Vuelta a España?",
                   "options": ["Ciclismo", "Atletismo", "Natación", "Triatlón"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Cuál es el nombre del estadio del Real Madrid?",
                   "options": ["Camp Nou", "Santiago Bernabéu", "Wembley Stadium", "Anfield"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué deporte se utilizan las pesas?",
                   "options": ["Natación", "Atletismo", "Halterofilia", "Gimnasia"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué deporte practica Roger Federer?",
                   "options": ["Tenis", "Golf", "Esquí", "Fútbol"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿En qué deporte se practica el 'slalom'?",
                   "options": ["Esquí", "Natación", "Atletismo", "Ciclismo"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué deporte se juega con un bate, una pelota y guantes?",
                   "options": ["Golf", "Cricket", "Béisbol", "Tenis"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el deporte que se practica en el Abierto de Australia?",
                   "options": ["Golf", "Tenis", "Cricket", "Fútbol"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué deporte se practica el 'rally'?",
                   "options": ["Ciclismo", "Automovilismo", "Motociclismo", "Atletismo"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué deporte se juega con palos y un disco en una superficie helada?",
                   "options": ["Curling", "Hockey sobre hielo", "Patinaje artístico", "Patinaje de velocidad"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué deporte se practica el 'sprint'?",
                   "options": ["Natación", "Ciclismo", "Atletismo", "Esquí"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el nombre del cinturón que se entrega al campeón de boxeo?",
                   "options": ["Medalla de oro", "Copa del mundo", "Cinturón de campeón", "Anillo de campeón"],
                   "correctAnswer": 2
               }
            ],

        entretenimiento: [
                {
                    "question": "¿Quién dirigió la película 'Titanic'?",
                    "options": ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué serie de televisión se centra en la vida de un profesor de química que se convierte en fabricante de metanfetamina?",
                    "options": ["The Walking Dead", "Breaking Bad", "Game of Thrones", "Stranger Things"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién es el cantante principal de la banda Coldplay?",
                    "options": ["Bono", "Chris Martin", "Adam Levine", "Brandon Flowers"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el nombre del mago protagonista de una famosa saga de libros y películas?",
                    "options": ["Ronald Weasley", "Hermione Granger", "Albus Dumbledore", "Harry Potter"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Qué plataforma de streaming es conocida por series como 'The Crown' y 'Stranger Things'?",
                    "options": ["Netflix", "Amazon Prime Video", "Hulu", "Disney+"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Quién es el autor de la novela 'Don Quijote de la Mancha'?",
                    "options": ["Gabriel García Márquez", "Jorge Luis Borges", "Miguel de Cervantes", "Mario Vargas Llosa"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué película ganó el Oscar a la Mejor Película en 2020?",
                    "options": ["Joker", "1917", "Once Upon a Time in Hollywood", "Parasite"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Quién es el creador de 'Los Simpson'?",
                    "options": ["Seth MacFarlane", "Matt Groening", "Trey Parker", "Mike Judge"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué cantante es conocida como la 'Reina del Pop'?",
                    "options": ["Lady Gaga", "Beyoncé", "Rihanna", "Madonna"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es el nombre del personaje principal de la serie 'Sherlock' interpretado por Benedict Cumberbatch?",
                    "options": ["John Watson", "Mycroft Holmes", "Sherlock Holmes", "Jim Moriarty"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué musical de Broadway se basa en la vida de Alexander Hamilton?",
                    "options": ["Wicked", "Les Misérables", "Hamilton", "The Phantom of the Opera"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué actor interpretó a Iron Man en el Universo Cinematográfico de Marvel?",
                    "options": ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué serie de televisión de HBO está basada en los libros de George R.R. Martin?",
                    "options": ["Westworld", "The Sopranos", "Game of Thrones", "True Detective"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué banda británica lanzó el álbum 'Abbey Road'?",
                    "options": ["The Rolling Stones", "The Who", "Queen", "The Beatles"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Quién escribió la obra 'Romeo y Julieta'?",
                    "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué película animada de Disney cuenta la historia de una joven llamada Moana?",
                    "options": ["Frozen", "Tangled", "Moana", "Brave"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué actor protagoniza la saga de películas 'Misión Imposible'?",
                    "options": ["Brad Pitt", "George Clooney", "Tom Cruise", "Matt Damon"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué serie de televisión sigue las vidas de un grupo de amigos en la ciudad de Nueva York?",
                    "options": ["Seinfeld", "The Office", "Friends", "Parks and Recreation"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué artista es conocido por canciones como 'Billie Jean' y 'Thriller'?",
                    "options": ["Prince", "Stevie Wonder", "Michael Jackson", "Lionel Richie"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el nombre del programa de televisión de cocina presentado por Gordon Ramsay?",
                    "options": ["MasterChef", "Hell's Kitchen", "Top Chef", "The Great British Bake Off"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué película de ciencia ficción dirigida por Christopher Nolan trata sobre sueños dentro de sueños?",
                    "options": ["Interstellar", "Inception", "The Prestige", "Memento"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién es el personaje principal de la serie 'Doctor Who'?",
                    "options": ["The Master", "Rose Tyler", "The Doctor", "Dalek"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué banda de rock es conocida por la canción 'Bohemian Rhapsody'?",
                    "options": ["The Rolling Stones", "Led Zeppelin", "Queen", "Pink Floyd"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué libro de J.R.R. Tolkien precede a 'El Señor de los Anillos'?",
                    "options": ["El Silmarillion", "Los Cuentos Inconclusos", "El Hobbit", "Las Aventuras de Tom Bombadil"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué serie de televisión trata sobre una firma de abogados en Nueva York?",
                    "options": ["Law & Order", "Suits", "The Good Wife", "Boston Legal"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué película de Quentin Tarantino presenta un grupo de soldados estadounidenses durante la Segunda Guerra Mundial?",
                    "options": ["Pulp Fiction", "Reservoir Dogs", "Inglourious Basterds", "Kill Bill"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Qué cantante es conocida por canciones como 'Rolling in the Deep' y 'Someone Like You'?",
                    "options": ["Rihanna", "Adele", "Beyoncé", "Taylor Swift"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Qué serie de televisión sigue las vidas de un grupo de adolescentes en la escuela secundaria de California?",
                    "options": ["The O.C.", "Gossip Girl", "Beverly Hills, 90210", "One Tree Hill"],
                    "correctAnswer": 0
                },
                {
                    "question": "¿Qué película de Steven Spielberg cuenta la historia de un tiburón que aterroriza a una ciudad costera?",
                    "options": ["E.T. the Extra-Terrestrial", "Jurassic Park", "Jaws", "Raiders of the Lost Ark"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Quién escribió la novela '1984'?",
                    "options": ["Aldous Huxley", "Ray Bradbury", "George Orwell", "Ernest Hemingway"],
                    "correctAnswer": 2
                },
               {
                   "question": "¿Qué actor interpreta a Jack Sparrow en la saga 'Piratas del Caribe'?",
                   "options": ["Brad Pitt", "Johnny Depp", "Orlando Bloom", "Keanu Reeves"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué serie de comedia sigue las vidas de un grupo de empleados en una oficina de la empresa Dunder Mifflin?",
                   "options": ["Parks and Recreation", "The Office", "Brooklyn Nine-Nine", "Modern Family"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién es el director de la película 'El Señor de los Anillos: La Comunidad del Anillo'?",
                   "options": ["Steven Spielberg", "Peter Jackson", "James Cameron", "George Lucas"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué cantante es conocido por su estilo de baile 'moonwalk'?",
                   "options": ["Elvis Presley", "Michael Jackson", "Prince", "James Brown"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué serie de televisión sigue las vidas de un grupo de superhéroes inadaptados?",
                   "options": ["The Boys", "Doom Patrol", "The Umbrella Academy", "Legends of Tomorrow"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Quién escribió la novela 'Orgullo y Prejuicio'?",
                   "options": ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "Louisa May Alcott"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué película ganó el premio Óscar a la Mejor Película en 2023?",
                   "options": ["Top Gun: Maverick", "Elvis", "Everything Everywhere All at Once", "The Banshees of Inisherin"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué actor interpreta a Wolverine en las películas de 'X-Men'?",
                   "options": ["Ryan Reynolds", "Hugh Jackman", "Patrick Stewart", "Ian McKellen"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué serie de televisión trata sobre un profesor de química que cocina metanfetamina?",
                   "options": ["Better Call Saul", "Ozark", "Breaking Bad", "Narcos"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué banda es conocida por canciones como 'Don't Stop Believin'' y 'Any Way You Want It'?",
                   "options": ["Bon Jovi", "Aerosmith", "Journey", "Guns N' Roses"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué película de comedia sigue a un grupo de amigos antes de una boda en Las Vegas?",
                   "options": ["Old School", "Wedding Crashers", "The Hangover", "Superbad"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué serie de televisión está ambientada en el mundo de la publicidad en la década de 1960?",
                   "options": ["The Newsroom", "Mad Men", "House of Cards", "Boardwalk Empire"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué cantante es conocida por canciones como 'Like a Prayer' y 'Vogue'?",
                   "options": ["Britney Spears", "Jennifer Lopez", "Madonna", "Kylie Minogue"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué película de ciencia ficción trata sobre un grupo de astronautas que viajan a través de un agujero de gusano?",
                   "options": ["Gravity", "Interstellar", "Arrival", "Contact"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién escribió la obra 'Hamlet'?",
                   "options": ["Christopher Marlowe", "Ben Jonson", "William Shakespeare", "Oscar Wilde"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué programa de televisión de talentos busca nuevos cantantes?",
                   "options": ["The Voice", "America's Got Talent", "Dancing with the Stars", "Survivor"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué película animada de Pixar trata sobre juguetes que cobran vida?",
                   "options": ["Monsters, Inc.", "Finding Nemo", "Toy Story", "The Incredibles"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué actor interpreta a James Bond en la película 'Casino Royale'?",
                   "options": ["Pierce Brosnan", "Sean Connery", "Daniel Craig", "Roger Moore"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué serie de televisión se centra en la vida de una familia rica en Nueva York?",
                   "options": ["Gossip Girl", "Dynasty", "The O.C.", "90210"],
                   "correctAnswer": 0
               }
            ],
        geografia: [
                {
                    "question": "¿Cuál es el río más largo del mundo?",
                    "options": ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es la capital de Australia?",
                    "options": ["Sydney", "Melbourne", "Canberra", "Perth"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el desierto más grande del mundo?",
                    "options": ["Sahara", "Antártico", "Ártico", "Australiano"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué continente se encuentra el monte Kilimanjaro?",
                    "options": ["Asia", "América", "África", "Europa"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el país más grande del mundo por superficie?",
                    "options": ["China", "Estados Unidos", "Canadá", "Rusia"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es la capital de Japón?",
                    "options": ["Kioto", "Osaka", "Tokio", "Nagoya"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el océano más grande?",
                    "options": ["Atlántico", "Índico", "Ártico", "Pacífico"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿En qué país se encuentra la Torre Eiffel?",
                    "options": ["Italia", "España", "Francia", "Alemania"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el mar más grande del mundo?",
                    "options": ["Mediterráneo", "Caribe", "Arábigo", "Mar de China Meridional"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es la capital de Canadá?",
                    "options": ["Toronto", "Montreal", "Vancouver", "Ottawa"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es la cordillera más larga del mundo?",
                    "options": ["Himalaya", "Andes", "Alpes", "Rocosas"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué continente se encuentra Brasil?",
                    "options": ["Europa", "Asia", "América del Sur", "África"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la capital de Egipto?",
                    "options": ["Alejandría", "El Cairo", "Luxor", "Giza"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Cuál es el lago más grande del mundo por superficie?",
                    "options": ["Lago Superior", "Lago Victoria", "Mar Caspio", "Lago Hurón"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué país se encuentra la Gran Muralla China?",
                    "options": ["Japón", "Corea del Sur", "China", "Vietnam"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la capital de Argentina?",
                    "options": ["Córdoba", "Rosario", "Mendoza", "Buenos Aires"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es el estrecho que separa Europa de África?",
                    "options": ["Estrecho de Bering", "Estrecho de Magallanes", "Estrecho de Ormuz", "Estrecho de Gibraltar"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿En qué continente se encuentra la India?",
                    "options": ["Europa", "África", "Asia", "Oceanía"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la capital de Italia?",
                    "options": ["Milán", "Florencia", "Venecia", "Roma"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Cuál es el punto más alto de la Tierra?",
                    "options": ["K2", "Aconcagua", "Monte Everest", "Denali"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué país se encuentra el Taj Mahal?",
                    "options": ["Pakistán", "Irán", "India", "Turquía"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la capital de México?",
                    "options": ["Guadalajara", "Monterrey", "Ciudad de México", "Puebla"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es el nombre del canal que conecta el Océano Atlántico con el Océano Pacífico?",
                    "options": ["Canal de Suez", "Canal de Panamá", "Canal de Corinto", "Canal de la Mancha"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué continente se encuentra Nueva Zelanda?",
                    "options": ["Asia", "Antártida", "Oceanía", "América"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Cuál es la capital de España?",
                    "options": ["Barcelona", "Valencia", "Sevilla", "Madrid"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Qué es la línea del Ecuador?",
                    "options": ["Un meridiano", "Un paralelo", "Una cordillera", "Un río"],
                    "correctAnswer": 1
                },
               {
                   "question": "¿Cuál es la ciudad más poblada del mundo?",
                   "options": ["Tokio", "Delhi", "Shanghái", "São Paulo"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Cuál es el volcán más alto del mundo?",
                   "options": ["Monte Kilimanjaro", "Monte Fuji", "Nevado Ojos del Salado", "Mauna Loa"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el país con más islas del mundo?",
                   "options": ["Filipinas", "Indonesia", "Japón", "Grecia"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué estado de Estados Unidos es famoso por sus secuoyas gigantes?",
                   "options": ["Texas", "Florida", "California", "Alaska"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿En qué país se encuentra la ciudad de Machu Picchu?",
                   "options": ["Colombia", "Ecuador", "Perú", "Bolivia"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué es un fiordo?",
                   "options": ["Un tipo de desierto", "Un lago volcánico", "Una entrada de mar estrecha entre montañas", "Un tipo de glaciar"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es el país que comparte frontera con más países?",
                   "options": ["Rusia", "China", "Brasil", "India"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué es el Greenwich Meridian?",
                   "options": ["Una línea imaginaria que divide el mundo en hemisferios", "Una montaña en Inglaterra", "Un tipo de clima", "Un parque nacional"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Cuál es la capital de Sudáfrica?",
                   "options": ["Johannesburgo", "Ciudad del Cabo", "Pretoria", "Durban"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué continente es conocido como el continente helado?",
                   "options": ["Ártico", "Antártida", "Groenlandia", "Siberia"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el país más pequeño del mundo?",
                   "options": ["Mónaco", "Nauru", "Ciudad del Vaticano", "Tuvalu"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué son los Alpes?",
                   "options": ["Un lago", "Una cadena montañosa", "Un desierto", "Una isla"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el país que tiene forma de bota?",
                   "options": ["Grecia", "Croacia", "Italia", "Portugal"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué es un atolón?",
                   "options": ["Una formación volcánica", "Una isla de coral con forma de anillo", "Un tipo de glaciar", "Un desierto de sal"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el río que atraviesa Londres?",
                   "options": ["Sena", "Támesis", "Rin", "Danubio"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué continente es conocido como el 'continente oscuro'?",
                   "options": ["Asia", "África", "América del Sur", "Australia"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Cuál es el país que alberga la selva amazónica en mayor proporción?",
                   "options": ["Colombia", "Venezuela", "Brasil", "Perú"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué son las cataratas del Niágara?",
                   "options": ["Una montaña", "Un desierto", "Un conjunto de cascadas", "Un lago"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Cuál es la capital de Irlanda?",
                   "options": ["Belfast", "Cork", "Galway", "Dublín"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Qué océano rodea la Antártida?",
                   "options": ["Océano Atlántico", "Océano Índico", "Océano Glacial Ártico", "Océano Glacial Antártico"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Qué ciudad es conocida como la 'Ciudad Eterna'?",
                   "options": ["Atenas", "Roma", "Jerusalén", "Estambul"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué son las dunas?",
                   "options": ["Formaciones montañosas", "Depósitos de arena formados por el viento", "Un tipo de árbol", "Un fenómeno meteorológico"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué país se encuentra la ciudad de Sídney?",
                   "options": ["Nueva Zelanda", "Australia", "Inglaterra", "Estados Unidos"],
                   "correctAnswer": 1
               }
            ],
        historia: [
                {
                    "question": "¿En qué año comenzó la Revolución Francesa?",
                    "options": ["1776", "1789", "1804", "1815"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el primer emperador romano?",
                    "options": ["Julio César", "Nerón", "Augusto", "Tiberio"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año cayó el Muro de Berlín?",
                    "options": ["1985", "1989", "1991", "1995"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién lideró la expedición que circunnavegó el mundo por primera vez?",
                    "options": ["Cristóbal Colón", "Vasco da Gama", "Fernando de Magallanes", "Américo Vespucio"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año comenzó la Segunda Guerra Mundial?",
                    "options": ["1936", "1939", "1941", "1945"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el faraón que descubrió Howard Carter?",
                    "options": ["Ramsés II", "Akenatón", "Tutankamón", "Keops"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?",
                    "options": ["1765", "1776", "1783", "1789"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el líder de la Unión Soviética durante la mayor parte de la Guerra Fría?",
                    "options": ["Vladímir Lenin", "Iósif Stalin", "Nikita Jrushchov", "Mijaíl Gorbachov"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se produjo la Revolución Rusa?",
                    "options": ["1905", "1917", "1922", "1929"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el rey de Macedonia que conquistó gran parte del mundo conocido en el siglo IV a.C.?",
                    "options": ["Filipo II", "Alejandro Magno", "Perseo", "Casandro"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué año se produjo el descubrimiento de América por Cristóbal Colón?",
                    "options": ["1453", "1492", "1519", "1532"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el emperador francés que dominó Europa a principios del siglo XIX?",
                    "options": ["Luis XIV", "Luis XVI", "Napoleón Bonaparte", "Carlos X"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año terminó la Guerra de Vietnam?",
                    "options": ["1965", "1969", "1973", "1975"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Quién fue la reina de Inglaterra durante la época de Shakespeare?",
                    "options": ["María I", "Isabel I", "Ana", "Victoria"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿En qué año se produjo la unificación de Alemania?",
                    "options": ["1848", "1871", "1919", "1949"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el líder del movimiento de independencia de la India?",
                    "options": ["Jawaharlal Nehru", "Indira Gandhi", "Mahatma Gandhi", "Sardar Patel"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se produjo la Guerra Civil Española?",
                    "options": ["1931", "1936", "1939", "1945"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el presidente de Estados Unidos durante la Guerra Civil Americana?",
                    "options": ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Andrew Jackson"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se fundó la Organización de las Naciones Unidas (ONU)?",
                    "options": ["1920", "1945", "1949", "1955"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el líder de la Revolución Cubana?",
                    "options": ["Fulgencio Batista", "Ernesto 'Che' Guevara", "Fidel Castro", "Raúl Castro"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se produjo la Revolución China?",
                    "options": ["1911", "1927", "1937", "1949"],
                    "correctAnswer": 3
                },
                {
                    "question": "¿Quién fue el primer presidente de Sudáfrica después del apartheid?",
                    "options": ["Desmond Tutu", "Steve Biko", "Nelson Mandela", "Thabo Mbeki"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se produjo el ataque a Pearl Harbor?",
                    "options": ["1939", "1940", "1941", "1942"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿Quién fue el líder de la Alemania nazi durante la Segunda Guerra Mundial?",
                    "options": ["Joseph Goebbels", "Heinrich Himmler", "Adolf Hitler", "Hermann Göring"],
                    "correctAnswer": 2
                },
                {
                    "question": "¿En qué año se produjo la caída de Constantinopla ante los turcos otomanos?",
                    "options": ["1204", "1453", "1492", "1517"],
                    "correctAnswer": 1
                },
                {
                    "question": "¿Quién fue el inventor de la imprenta de tipos móviles?",
                    "options": ["Leonardo da Vinci", "Johannes Gutenberg", "Marco Polo", "Galileo Galilei"],
                    "correctAnswer": 1
                },
               {
                   "question": "¿Qué civilización construyó las pirámides de Teotihuacán?",
                   "options": ["Maya", "Azteca", "Tolteca", "Olmeca"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Quién fue el primer presidente de Rusia después de la caída de la Unión Soviética?",
                   "options": ["Mijaíl Gorbachov", "Boris Yeltsin", "Vladímir Putin", "Dmitri Medvédev"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Qué evento histórico se conoce como la 'Noche de los Cristales Rotos'?",
                   "options": ["La Batalla de Stalingrado", "El ataque a Pearl Harbor", "Una serie de ataques contra judíos en la Alemania nazi", "La invasión de Polonia"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿En qué año tuvo lugar el desastre de Chernóbil?",
                   "options": ["1976", "1986", "1996", "2006"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién fue la primera mujer en viajar al espacio?",
                   "options": ["Valentina Tereshkova", "Sally Ride", "Svetlana Savítskaya", "Judith Resnik"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué imperio construyó la ciudad de Machu Picchu?",
                   "options": ["Azteca", "Maya", "Inca", "Olmeca"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Quién fue el primer presidente de los Estados Unidos?",
                   "options": ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Qué conflicto enfrentó a Esparta y Atenas en la antigua Grecia?",
                   "options": ["Las Guerras Médicas", "La Guerra del Peloponeso", "La Guerra de Troya", "La Guerra de las Galias"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué país se originaron los Juegos Olímpicos?",
                   "options": ["Italia", "Grecia", "Egipto", "Turquía"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién fue el último zar de Rusia?",
                   "options": ["Alejandro II", "Alejandro III", "Nicolás I", "Nicolás II"],
                   "correctAnswer": 3
               },
               {
                   "question": "¿Qué civilización se caracterizó por sus gladiadores y el Coliseo?",
                   "options": ["Griega", "Egipcia", "Romana", "Cartaginesa"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿En qué año comenzó la Guerra de Corea?",
                   "options": ["1945", "1950", "1955", "1960"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién fue el líder del movimiento de los derechos civiles en Estados Unidos en la década de 1960?",
                   "options": ["Malcolm X", "Rosa Parks", "Martin Luther King Jr.", "Nelson Mandela"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué tratado puso fin a la Primera Guerra Mundial?",
                   "options": ["Tratado de Versalles", "Tratado de Tordesillas", "Tratado de París", "Tratado de Roma"],
                   "correctAnswer": 0
               },
               {
                   "question": "¿Qué dinastía gobernó China durante la construcción de la Gran Muralla China?",
                   "options": ["Ming", "Qin", "Han", "Tang"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿En qué año se produjo el genocidio de Ruanda?",
                   "options": ["1984", "1994", "2004", "2014"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién fue el primer ministro del Reino Unido durante la Segunda Guerra Mundial?",
                   "options": ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "Stanley Baldwin"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué civilización creó el calendario maya?",
                   "options": ["Inca", "Azteca", "Maya", "Olmeca"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿En qué año tuvo lugar la Revolución Cultural en China?",
                   "options": ["1949", "1956", "1966", "1976"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Quién fue el primer presidente de Rusia después de la caída del comunismo?",
                   "options": ["Lenin", "Stalin", "Yeltsin", "Putin"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿En qué año se produjo la Guerra de las Malvinas/Falklands?",
                   "options": ["1972", "1982", "1992", "2002"],
                   "correctAnswer": 1
               },
               {
                   "question": "¿Quién fue el líder de los nativos americanos Apaches?",
                   "options": ["Toro Sentado", "Caballo Loco", "Gerónimo", "Nube Roja"],
                   "correctAnswer": 2
               },
               {
                   "question": "¿Qué evento marcó el comienzo de la Edad Media?",
                   "options": ["La caída del Imperio Romano de Occidente", "El nacimiento de Jesucristo", "La invasión de los bárbaros", "El Concilio de Nicea"],
                   "correctAnswer": 0
               }
            ]
    };
    function shuffleArray(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
    
    function startGame() {
        const selectedCategory = categorySelect.value;
        console.log("Categoría seleccionada:", selectedCategory); // Paso 1: Verificar la categoría
    
        let availableQuestions = [...allQuestions[selectedCategory]];
        console.log("Preguntas disponibles antes de barajar:", availableQuestions); // Paso 2: Ver preguntas antes de barajar
    
        // Validación del tamaño del banco de preguntas
        if (availableQuestions.length < QUESTION_BANK_SIZE) {
            console.warn(`La categoría "${selectedCategory}" tiene menos de ${QUESTION_BANK_SIZE} preguntas.`);
        }
    
        availableQuestions = shuffleArray(availableQuestions);
        console.log("Preguntas disponibles después de barajar:", availableQuestions); // Paso 3: Ver preguntas después de barajar
    
        questions = availableQuestions.slice(0, NUM_QUESTIONS_PER_CATEGORY);
        console.log("Preguntas seleccionadas para la trivia:", questions); // Paso 4: Ver preguntas seleccionadas
    
        currentQuestionIndex = 0;
        score = 0;
        questionContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
        showQuestion();
    }
    
    function showQuestion() {
      console.log("Mostrando pregunta:", currentQuestionIndex);  // Ver si la función se llama
      resetState();
      let question = questions[currentQuestionIndex];
      console.log("Pregunta actual:", question); // Verificar la pregunta
      questionElement.innerText = question.question;
    
      question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerText = option;
        li.classList.add("option");
        li.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(li);
      });
    }
    
    function resetState() {
        while (optionsElement.firstChild) {
            optionsElement.removeChild(optionsElement.firstChild);
        }
    }
    
    function selectAnswer(index) {
        const correct = index === questions[currentQuestionIndex].correctAnswer;
        if (correct) {
            score++;
        }
    
        const options = document.querySelectorAll(".option");
        options.forEach((option, i) => {
            if (i === questions[currentQuestionIndex].correctAnswer) {
                option.classList.add("correct");
            }
            if (i === index) {
                option.classList.add(correct ? "selected-correct" : "selected-incorrect");
            }
            option.removeEventListener("click", () => selectAnswer(i)); //Deshabilitar click despues de seleccionar una respuesta
    
        });
    
        nextButton.style.display = 'block';  //Mostrar el boton de siguiente
    }
    
    function showScore() {
        resetState();
        questionContainer.style.display = 'none';
        nextButton.style.display = 'none';  //Ocultar el boton de siguiente
        resultsContainer.style.display = 'block';
        scoreElement.innerText = `Tu puntaje es ${score} de ${questions.length}!`;
    }
    
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            nextButton.style.display = 'none';  //Ocultar el boton de siguiente
        } else {
            showScore();
        }
    }
    
    startButton.addEventListener("click", startGame);
    nextButton.addEventListener("click", handleNextButton);
});