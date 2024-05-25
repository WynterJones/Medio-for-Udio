const engine = {
  init: () => {
    const sidebar = document.querySelector(
      'aside[aria-label="Sidebar"] nav ul'
    );

    if (sidebar) {
      engine.lyricBarn();
    } else {
      const checkSidebar = setInterval(() => {
        const sidebar = document.querySelector(
          'aside[aria-label="Sidebar"] nav ul'
        );

        if (sidebar) {
          clearInterval(checkSidebar);
          console.log("Me-Dio, a sous chef for Udio.com");
          engine.friesAreDone();
          engine.lyricBarn();
        }
      }, 1000);
    }
  },

  lyricBarn: () => {
    const html = `<div class="-ml-5 pl-[16px]"><div class="relative flex items-center rounded-lg p-2 hover:text-foreground"><a class="mr-4 flex items-center" id="lyric-barn-link" href="#">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 16V4zm-2 6V4q0-.825.588-1.412T4 2h11q.825 0 1.413.588T17 4v.425q-.6.275-1.1.675T15 6V4H4v12h11v-4q.4.5.9.9t1.1.675V16q0 .825-.587 1.413T15 18H6zm4-8h4v-2H6zm13-2q-1.25 0-2.125-.875T16 9t.875-2.125T19 6q.275 0 .525.05t.475.125V1h4v2h-2v6q0 1.25-.875 2.125T19 12M6 11h7V9H6zm0-3h7V6H6z"/></svg>
    
    
    <span class="ml-3 flex-1 whitespace-nowrap font-bold">Lyric Manager</span>
    
    </a></div></div>`;
    const sidebar = document.querySelector(
      'aside[aria-label="Sidebar"] nav ul'
    );

    if (sidebar) {
      sidebar.insertAdjacentHTML("beforeend", html);

      const lyricBarnLink = document.getElementById("lyric-barn-link");
      lyricBarnLink.addEventListener("click", (e) => {
        e.preventDefault();

        if (!document.getElementById("lyric-barn-overlay")) {
          document.body.style.overflow = "hidden";
          console.log("putting on screen");
          const overlay = document.createElement("div");
          overlay.id = "lyric-barn-overlay";
          overlay.style.position = "fixed";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
          overlay.style.zIndex = "99999999999";
          overlay.style.transition = "transform 0.3s";
          overlay.style.transform = "translateX(0)";
          overlay.style.overflowY = "auto";
          overlay.style.padding = "25px";
          overlay.style.boxSizing = "border-box";
          overlay.style.display = "flex";
          overlay.style.flexDirection = "column";
          overlay.style.alignItems = "center";
          overlay.style.justifyContent = "center";
          overlay.style.color = "#fff";
          overlay.style.fontFamily = "Arial, sans-serif";
          overlay.style.fontSize = "16px";
          overlay.style.lineHeight = "1.5";
          overlay.style.fontWeight = "400";

          overlay.innerHTML = /* html */ `
<button
  id="close-lyric-barn"
  style="
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  "
>
  &times;
</button>

<div id="lyric-barn-content">
  <input type="hidden" id="lyric-id" />

  <button id="medioSettingsButton">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"/></svg>
  </button>

  <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px">
    Medio: Lyric Manager
    <span id="medioCharactersSelected" style="display:none" class="ml-3 text-sm text-gray-300 flex-1 whitespace-nowrap font-medium">0 Characters Selected</span>
  </h1>

  <div
  role="tablist"
  aria-orientation="horizontal"
  class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3 mb-4"
  tabindex="0"
  data-orientation="horizontal"
  style="outline: none"
>
  <button
    type="button"
    data-tab="write"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 bg-black"
  >
    Write
  </button>
  <button
    type="button"
    data-tab="rhyme"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Rhyme
  </button>
  <button
    type="button"
    data-tab="library"
    class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
  >
    Library
  </button>
</div>

<div style="display: none" class="settings-medio" >
  <h4 class="text-2xl font-bold mb-6">Settings</h4>
  <div class="">
    <div class="w-full items-center justify-between">
      <label class="font-medium text-lg text-gray-300 mb-1" for="medioSettingsAudioNotice">Audio Notification</label>
      <input type="checkbox" id="medioSettingsAudioNotice" />
    </div>

    <div class="w-full items-center justify-between">
      <label class="block font-medium text-lg text-gray-300 mb-1" for="medioSettingsAudioNotice">Audio Clip</label>
      <select name="medioSettingsAudioClip" class="w-full border rounded p-1">
        <option value="ding.mp3">Ding</option>
        <option value="ding2.mp3">Ding 2</option>
        <option value="ding3.mp3">Ding 3</option>
        <option value="ding4.mp3">Ding 4</option>
      </select>
    </div>

    <div class="w-full mt-4 hidden">
      <label class="block font-medium text-lg text-gray-300 mb-1" for="medioSettingsOpenAIKey">OpenAI Key</label>
      <input type="text" id="medioSettingsOpenAIKey" class="w-full border rounded p-1" />
    </div>
  </div>
</div>

<div style="display: none" class="lyric-tab" data-tab="rhyme">
  <div class="flex items-center justitfy-between mb-4">
    <input autocomplete="off" type="text" id="wordInput" placeholder="Enter a word to find rhymes..." />
    <button id="lyric-barn-findRhymeClear">Clear</button>
    <button id="lyric-barn-findRhyme">Find Rhymes</button>
  </div>
  <div id="results" class="w-full grid grid-cols-4 gap-2"></div>
</div>

<div style="display: none" class="lyric-tab" data-tab="library">
  <div id="medio-library-items" class="grid grid-cols-3 gap-4"></div>
</div>

<div class="lyric-tab" data-tab="write">
  <div id="toolbar" class="flex items-center justify-between ">
    <div class="flex space-x-2">
      <input autocomplete="off" type="text" id="lyric-title" placeholder="Song Title..." />
      <button id="save-lyrics" class="medio-toolbar-button">Save</button>
      <button id="clear-lyrics" class="medio-toolbar-button">Clear</button>
    </div>
    <div class="flex w-full space-x-2 justify-end items-end">
       <select class="ql-custom-dropdown">
          <option selected>Command</option>
          <option value="[Introduction]">Introduction</option>
          <option value="[Opening Theme]">Opening Theme</option>
          <option value="[Verse]">Verse</option>
          <option value="[Pre-Chorus]">Pre-Chorus</option>
          <option value="[Chorus]">Chorus</option>
          <option value="[Chorus Variation]">Chorus Variation</option>
          <option value="[Hook]">Hook</option>
          <option value="[Bridge]">Bridge</option>
          <option value="[Instrumental Break]">Instrumental Break</option>
          <option value="[Solo]">Solo</option>
          <option value="[Interlude]">Interlude</option>
          <option value="[Build-Up]">Build-Up</option>
          <option value="[Drop]">Drop</option>
          <option value="[Breakdown]">Breakdown</option>
          <option value="[Build-Up 2]">Build-Up 2</option>
          <option value="[Second Drop]">Second Drop</option>
          <option value="[Final Chorus]">Final Chorus</option>
          <option value="[Outro]">Outro</option>
          <option value="[Fade out]">Fade out</option>
          <option value="[Fade to end]">Fade to end</option>
          <option value="[Bass Line]">Bass Line</option>
          <option value="[Andante]">Andante</option>
          <option value="[Adagio]">Adagio</option>
          <option value="[Glissando]">Glissando</option>
          <option value="[Accelerando]">Accelerando</option>
          <option value="[Crescendo]">Crescendo</option>
      </select>

      <select class="ql-custom-dropdown">
        <option selected>Structure</option>
        <option value="[Quatrain 1]\n\n[Quatrain 2]\n\n[Quatrain 3]\n\n[Couplet]">Sonnet</option>
        <option value="[Verse]\n\n[Chorus]\n\n[Verse]\n\n[Chorus]\n\n[Bridge]\n\n[Chorus]">Ballad</option>
        <option value="[Line 1]\n\n[Line 2]\n\n[Line 3]">Haiku</option>
        <option value="[Line 1]\n\n[Line 2]\n\n[Line 3]\n\n[Line 4]\n\n[Line 5]">Limerick</option>
        <option value="[A-line]\n\n[A-line]\n\n[B-line]">Blues</option>
        <option value="[Stanza 1]\n\n[Stanza 2]">Quatrain</option>
        <option value="[Strophe]\n\n[Antistrophe]\n\n[Epode]">Ode</option>
        <option value="[Stanza 1]\n\n[Stanza 2]\n\n[Stanza 3]\n\n[Stanza 4]\n\n[Stanza 5]\n\n[Stanza 6]\n\n[Envoi]">Sestina</option>
        <option value="[Tercet 1]\n\n[Tercet 2]\n\n[Tercet 3]\n\n[Tercet 4]\n\n[Final Line]">Terza Rima</option>
        <option value="[Section 1]\n\n[Section 2]\n\n[Section 3]\n\n[Section 4]">Free Verse</option>
      </select>

      <select class="ql-custom-dropdown">
          <option selected>Instrument</option>
          <option value="[Piano Solo]">Piano</option>
          <option value="[Guitar Solo]">Guitar</option>
          <option value="[Bass Solo]">Bass</option>
          <option value="[Drums Solo]">Drums</option>
          <option value="[Violin Solo]">Violin</option>
          <option value="[Cello Solo]">Cello</option>
          <option value="[Flute Solo]">Flute</option>
          <option value="[Clarinet Solo]">Clarinet</option>
          <option value="[Saxophone Solo]">Saxophone</option>
          <option value="[Trumpet Solo]">Trumpet</option>
          <option value="[Trombone Solo]">Trombone</option>
          <option value="[Harp Solo]">Harp</option>
          <option value="[Synthesizer Solo]">Synthesizer</option>
          <option value="[Oboe Solo]">Oboe</option>
          <option value="[Bassoon Solo]">Bassoon</option>
          <option value="[French Horn Solo]">French Horn</option>
          <option value="[Tuba Solo]">Tuba</option>
          <option value="[Accordion Solo]">Accordion</option>
          <option value="[Banjo Solo]">Banjo</option>
          <option value="[Mandolin Solo]">Mandolin</option>
          <option value="[Ukulele Solo]">Ukulele</option>
          <option value="[Harmonica Solo]">Harmonica</option>
          <option value="[Marimba Solo]">Marimba</option>
          <option value="[Xylophone Solo]">Xylophone</option>
          <option value="[Vibraphone Solo]">Vibraphone</option>
          <option value="[Steel Drum Solo]">Steel Drum</option>
          <option value="[Tabla Solo]">Tabla</option>
          <option value="[Sitar Solo]">Sitar</option>
          <option value="[Didgeridoo Solo]">Didgeridoo</option>
          <option value="[Pan Flute Solo]">Pan Flute</option>
          <option value="[Bagpipes Solo]">Bagpipes</option>
          <option value="[Organ Solo]">Organ</option>
          <option value="[Keytar Solo]">Keytar</option>
          <option value="[Tambourine Solo]">Tambourine</option>
          <option value="[Bongos Solo]">Bongos</option>
          <option value="[Congas Solo]">Congas</option>
          <option value="[Timpani Solo]">Timpani</option>
          <option value="[Triangle Solo]">Triangle</option>
          <option value="[Cowbell Solo]">Cowbell</option>
          <option value="[Djembe Solo]">Djembe</option>
          <option value="[Kalimba Solo]">Kalimba</option>
          <option value="[Ocarina Solo]">Ocarina</option>
          <option value="[Zither Solo]">Zither</option>
          <option value="[Lute Solo]">Lute</option>
          <option value="[Baglama Solo]">Baglama</option>
          <option value="[Fiddle Solo]">Fiddle</option>
          <option value="[Balalaika Solo]">Balalaika</option>
          <option value="[Clarinet Solo]">Clarinet</option>
          <option value="[Shakuhachi Solo]">Shakuhachi</option>
          <option value="[Santoor Solo]">Santoor</option>
          <option value="[Erhu Solo]">Erhu</option>
          <option value="[Pipa Solo]">Pipa</option>
          <option value="[Guqin Solo]">Guqin</option>
          <option value="[Koto Solo]">Koto</option>
          <option value="[Shamisen Solo]">Shamisen</option>
          <option value="[Guzheng Solo]">Guzheng</option>
          <option value="[Sarangi Solo]">Sarangi</option>
          <option value="[Sarod Solo]">Sarod</option>
          <option value="[Veena Solo]">Veena</option>
          <option value="[Hurdy Gurdy Solo]">Hurdy Gurdy</option>
          <option value="[Dulcimer Solo]">Dulcimer</option>
          <option value="[Appalachian Dulcimer Solo]">Appalachian Dulcimer</option>
          <option value="[Cimbalom Solo]">Cimbalom</option>
          <option value="[Psaltery Solo]">Psaltery</option>
          <option value="[Bouzouki Solo]">Bouzouki</option>
          <option value="[Oud Solo]">Oud</option>
          <option value="[Rebab Solo]">Rebab</option>
          <option value="[Kora Solo]">Kora</option>
          <option value="[Ngoni Solo]">Ngoni</option>
          <option value="[Mbira Solo]">Mbira</option>
          <option value="[Hang Drum Solo]">Hang Drum</option>
          <option value="[Frame Drum Solo]">Frame Drum</option>
          <option value="[Uilleann Pipes Solo]">Uilleann Pipes</option>
          <option value="[Bandoneon Solo]">Bandoneon</option>
          <option value="[Melodica Solo]">Melodica</option>
          <option value="[Theremin Solo]">Theremin</option>
          <option value="[Glass Harmonica Solo]">Glass Harmonica</option>
          <option value="[Handpan Solo]">Handpan</option>
          <option value="[Laouto Solo]">Laouto</option>
          <option value="[Bodhran Solo]">Bodhran</option>
          <option value="[Soprano Saxophone Solo]">Soprano Saxophone</option>
          <option value="[Tenor Saxophone Solo]">Tenor Saxophone</option>
          <option value="[Baritone Saxophone Solo]">Baritone Saxophone</option>
          <option value="[Bass Clarinet Solo]">Bass Clarinet</option>
          <option value="[Contrabassoon Solo]">Contrabassoon</option>
          <option value="[Piccolo Solo]">Piccolo</option>
          <option value="[Cornet Solo]">Cornet</option>
          <option value="[Flugelhorn Solo]">Flugelhorn</option>
          <option value="[Alto Horn Solo]">Alto Horn</option>
          <option value="[Euphonium Solo]">Euphonium</option>
          <option value="[Sopranino Saxophone Solo]">Sopranino Saxophone</option>
          <option value="[Cimbasso Solo]">Cimbasso</option>
          <option value="[Alto Clarinet Solo]">Alto Clarinet</option>
          <option value="[Bass Flute Solo]">Bass Flute</option>
          <option value="[Contrabass Clarinet Solo]">Contrabass Clarinet</option>
          <option value="[Contrabass Flute Solo]">Contrabass Flute</option>
          <option value="[Subcontrabass Flute Solo]">Subcontrabass Flute</option>
          <option value="[Contrabass Saxophone Solo]">Contrabass Saxophone</option>
          <option value="[Sarrusophone Solo]">Sarrusophone</option>
          <option value="[Octobass Solo]">Octobass</option>
          <option value="[Glass Harp Solo]">Glass Harp</option>
          <option value="[Kalangu Solo]">Kalangu</option>
          <option value="[Thavil Solo]">Thavil</option>
          <option value="[Mridangam Solo]">Mridangam</option>
          <option value="[Tambura Solo]">Tambura</option>
          <option value="[Tar Solo]">Tar</option>
          <option value="[Ghatam Solo]">Ghatam</option>
          <option value="[Kanjira Solo]">Kanjira</option>
          <option value="[Clavichord Solo]">Clavichord</option>
          <option value="[Virginal Solo]">Virginal</option>
          <option value="[Portative Organ Solo]">Portative Organ</option>
          <option value="[Regal Solo]">Regal</option>
          <option value="[Harmonium Solo]">Harmonium</option>
          <option value="[Bandura Solo]">Bandura</option>
          <option value="[Cavaquinho Solo]">Cavaquinho</option>
          <option value="[Charango Solo]">Charango</option>
          <option value="[Cuatro Solo]">Cuatro</option>
          <option value="[Tiple Solo]">Tiple</option>
          <option value="[Crumhorn Solo]">Crumhorn</option>
          <option value="[Rackett Solo]">Rackett</option>
          <option value="[Shawm Solo]">Shawm</option>
          <option value="[Cornamuse Solo]">Cornamuse</option>
          <option value="[Dulzaina Solo]">Dulzaina</option>
          <option value="[Zurna Solo]">Zurna</option>
          <option value="[Suona Solo]">Suona</option>
          <option value="[Bansuri Solo]">Bansuri</option>
          <option value="[Duduk Solo]">Duduk</option>
          <option value="[Shehnai Solo]">Shehnai</option>
          <option value="[Khaen Solo]">Khaen</option>
          <option value="[Kaval Solo]">Kaval</option>
          <option value="[Pennywhistle Solo]">Pennywhistle</option>
          <option value="[Low Whistle Solo]">Low Whistle</option>
      </select>

      <select id="medioextraCommands" class="ql-custom-dropdown">
          <option selected>Extra</option>
          <option value="Lyrics by [Your Name] © 2024">Copyright Stamp 1</option>
          <option value="© 2024 [Your Name]">Copyright Stamp 2</option>
          <option value="[Your Name] - All rights reserved, 2024">Copyright Stamp 3</option>
          <option value="[Spoken Word]">Spoken Word</option>
          <option value="[Wolf Noise]">Wolf Noise</option>
          <option value="[Siren]">Siren</option>
          <option value="[Applause]">Applause</option>
          <option value="[Bell]">Bell</option>
          <option value="[Birds Chirping]">Birds Chirping</option>
          <option value="[Car Horn]">Car Horn</option>
          <option value="[Cat Meow]">Cat Meow</option>
          <option value="[Clapping]">Clapping</option>
          <option value="[Crowd Cheering]">Crowd Cheering</option>
          <option value="[Dog Bark]">Dog Bark</option>
          <option value="[Door Slam]">Door Slam</option>
          <option value="[Drum Roll]">Drum Roll</option>
          <option value="[Explosion]">Explosion</option>
          <option value="[Footsteps]">Footsteps</option>
          <option value="[Gunshot]">Gunshot</option>
          <option value="[Helicopter]">Helicopter</option>
          <option value="[Heartbeat]">Heartbeat</option>
          <option value="[Laughing]">Laughing</option>
          <option value="[Lightning]">Lightning</option>
          <option value="[Motorcycle Rev]">Motorcycle Rev</option>
          <option value="[Ocean Waves]">Ocean Waves</option>
          <option value="[Police Siren]">Police Siren</option>
          <option value="[Rain]">Rain</option>
          <option value="[Rooster Crow]">Rooster Crow</option>
          <option value="[Running Water]">Running Water</option>
          <option value="[Sheep Baa]">Sheep Baa</option>
          <option value="[Sneezing]">Sneezing</option>
          <option value="[Snoring]">Snoring</option>
          <option value="[Thunder]">Thunder</option>
          <option value="[Train Whistle]">Train Whistle</option>
          <option value="[Typewriter]">Typewriter</option>
          <option value="[Water Droplet]">Water Droplet</option>
          <option value="[Whale Song]">Whale Song</option>
          <option value="[Whispering]">Whispering</option>
          <option value="[Wind Blowing]">Wind Blowing</option>
          <option value="[Window Breaking]">Window Breaking</option>
          <option value="[Wolf Howl]">Wolf Howl</option>
          <option value="[Alarm Clock]">Alarm Clock</option>
          <option value="[Audience Laughter]">Audience Laughter</option>
          <option value="[Baby Crying]">Baby Crying</option>
          <option value="[Birdsong]">Birdsong</option>
          <option value="[Door Knock]">Door Knock</option>
          <option value="[Fire Crackling]">Fire Crackling</option>
      </select>
    </div>
  </div>
  <div id="editor"></div>
</div>
</div>

        `;

          document.body.appendChild(overlay);

          engine.turnOnQuill();
          engine.changeTab();

          const closeLyricBarn = document.getElementById("close-lyric-barn");
          closeLyricBarn.addEventListener("click", () => {
            overlay.style.transform = "translateX(-100%)";
            document.body.style.overflow = "auto";
          });

          const medioSettingsButton = document.getElementById(
            "medioSettingsButton"
          );
          medioSettingsButton.addEventListener("click", () => {
            const settings = document.querySelector(".settings-medio");
            if (settings.style.display === "none") {
              settings.style.display = "block";
              const tabs = document.querySelectorAll(".lyric-tab");
              tabs.forEach((tab) => {
                tab.style.display = "none";
              });
              const tabButtons = document.querySelectorAll(".lyric-tab-button");
              tabButtons.forEach((button) => {
                button.classList.remove("bg-black");
              });
            } else {
              settings.style.display = "none";
            }
          });

          const findRhymes = document.getElementById("lyric-barn-findRhyme");
          findRhymes.addEventListener("click", () => {
            engine.checkRhymes();
          });

          const findRhymesClear = document.getElementById(
            "lyric-barn-findRhymeClear"
          );
          findRhymesClear.addEventListener("click", () => {
            document.getElementById("wordInput").value = "";
            document.getElementById("results").innerHTML = "";
          });

          const wordInput = document.getElementById("wordInput");
          wordInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              engine.checkRhymes();
            }
          });

          const saveLyrics = document.getElementById("save-lyrics");
          saveLyrics.addEventListener("click", () => {
            engine.save();
          });

          const clearLyrics = document.getElementById("clear-lyrics");
          clearLyrics.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear the results?")) {
              document.getElementById("lyric-id").value = "";
              document.getElementById("lyric-title").value = "";
              engine.quill.root.innerHTML = "";
            }
          });

          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              const overlay = document.getElementById("lyric-barn-overlay");
              overlay.style.transform = "translateX(-100%)";
              document.body.style.overflow = "auto";
            }

            if ((e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) {
              console.log("ctrl+k");
              const overlay = document.getElementById("lyric-barn-overlay");
              overlay.style.transform = "translateX(0)";
              document.body.style.overflow = "hidden";
            }
          });
        } else {
          const overlay = document.getElementById("lyric-barn-overlay");
          overlay.style.transform = "translateX(0)";
        }
      });
    }
  },

  friesAreDone: () => {
    const target =
      "a.relative.flex.flex-row.items-center.justify-center.text-sm[href='/my-creations']";

    console.log("Sir, the fries are in oven. Please let the DJ cook.");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(
          "HAL observing Udio numbers:",
          mutation.target.innerText || "not found"
        );

        if (
          !engine.state.isChecking &&
          mutation.target.innerText &&
          mutation.target.innerText.split("/")[0] ===
            mutation.target.innerText.split("/")[1]
        ) {
          engine.state.isChecking = true;
          let audio = new Audio(chrome.runtime.getURL("ding.mp3"));
          audio.play();

          if (Notification.permission === "granted") {
            let notification = new Notification("Fries are done!");
          } else if (
            Notification.permission !== "denied" ||
            Notification.permission === "default"
          ) {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                let notification = new Notification("Fries are done!");
              }
            });
          }

          console.log("Target aquired. Ding! Ding! Ding!");
          console.log("Overheating, waiting 6 seconds...");

          setTimeout(() => {
            engine.state.isChecking = false;
            console.log("Battle tank is ready to roll.");
          }, 6000);
        } else {
          engine.state.isChecking = false;
        }
      });
    });

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    const checkTargetNode = setInterval(() => {
      const targetNode = document.querySelector(target);
      if (targetNode) {
        observer.observe(targetNode, config);
        clearInterval(checkTargetNode);
        engine.state.isRunning = true;
        console.log("Autobots out, ready to roll.");
      }
    }, 1000);
  },

  changeTab: () => {
    const tabButtons = document.querySelectorAll(".lyric-tab-button");

    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const tab = e.target.dataset.tab;
        const tabs = document.querySelectorAll(".lyric-tab");
        document.querySelector(".settings-medio").style.display = "none";

        tabButtons.forEach((button) => {
          button.setAttribute(
            "class",
            "lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
          );
        });

        e.target.setAttribute(
          "class",
          "lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black px-3"
        );

        tabs.forEach((tab) => {
          tab.style.display = "none";
        });

        const selectedTab = document.querySelector(
          `.lyric-tab[data-tab=${tab}]`
        );
        selectedTab.style.display = "block";

        if (tab === "rhyme") {
          document.getElementById("wordInput").focus();
          document.getElementById("wordInput").select();
        } else if (tab === "library") {
          chrome.storage.local.get(["medioLyrics"], function (result) {
            const medioLyrics = result.medioLyrics || [];
            const libraryItems = document.getElementById("medio-library-items");
            libraryItems.innerHTML = "";

            if (medioLyrics.length === 0) {
              libraryItems.setAttribute(
                "class",
                "text-center w-full p-4 text-gray-500"
              );
              libraryItems.innerHTML =
                "<h3 class='text-2xl text-gray-200 font-bold mb-2'>No Songs Found</h3> <p>Your songs will appear here to edit & manage at any time.</p>";
              return;
            }

            medioLyrics.forEach((lyric) => {
              const lyricItem = document.createElement("a");
              lyricItem.href = "#";
              lyricItem.classList.add(
                "open-lyric",
                "border",
                "rounded-lg",
                "p-3",
                "text-lg",
                "font-bold"
              );
              lyricItem.innerHTML = `<h3 class="text-xl font-medium">${
                lyric.title
              }</h3> <p class="text-xs mt-1 text-gray-400">${
                lyric.created_at
                  ? engine.formatDate(lyric.created_at || Date.now())
                  : "8:20PM on June, 28th, 2024"
              }</p>`;
              lyricItem.addEventListener("click", () => {
                document.getElementById("lyric-id").value = lyric.id;
                document.getElementById("lyric-title").value = lyric.title;
                engine.quill.root.innerHTML = lyric.content;

                const firstTab = document.querySelector(".lyric-tab-button");
                firstTab.click();
              });

              libraryItems.appendChild(lyricItem);
            });
          });
        }
      });
    });
  },

  formatDate: (date) => {
    date = new Date(date);
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    };

    let formatter = new Intl.DateTimeFormat("en-US", options);
    let formattedParts = formatter.formatToParts(date);

    let month, day, year, time;
    for (let part of formattedParts) {
      switch (part.type) {
        case "month":
          month = part.value;
          break;
        case "day":
          day = part.value;
          break;
        case "year":
          year = part.value;
          break;
        case "hour":
        case "minute":
        case "dayPeriod":
          time =
            (time ? time : "") +
            part.value +
            (part.type === "dayPeriod" ? "" : ":");
          break;
      }
    }

    return `${time.trim()} on ${month} ${day}, ${year}`;
  },

  quill: null,

  turnOnQuill: () => {
    function insertText(quill, text) {
      const range = quill.getSelection();
      if (range) {
        const newText = `${text}\n`;
        quill.insertText(range.index, newText);
        quill.setSelection(range.index + newText.length);
      }
    }
    const Delta = Quill.import("delta");
    var CustomDropdown = function (quill, options) {
      let toolbar = quill.getModule("toolbar");
      toolbar.addHandler("custom-dropdown", function (value) {
        if (value) {
          insertText(quill, value);
        }
      });
    };

    Quill.register("modules/customDropdown", CustomDropdown);

    engine.quill = new Quill("#editor", {
      theme: "snow",
      placeholder: engine.randomStartingText(),
      modules: {
        toolbar: {
          container: "#toolbar",
          handlers: {
            "custom-dropdown": function (value) {
              insertText(this.quill, value);
            },
          },
        },
        customDropdown: true,
      },
    });

    engine.quill.on("selection-change", function (range, oldRange, source) {
      if (range) {
        const el = document.getElementById("medioCharactersSelected");
        if (range.length == 0) {
          el.style.display = "none";
        } else {
          const text = engine.quill.getText(range.index, range.length);
          const charCount = text.length;
          el.style.display = "inline-block";
          el.innerHTML =
            "You have <strong class='text-white font-bold'>" +
            charCount +
            "</strong> characters selected. <em class='italic text-gray-500'>(Recommended: Less than 350 characters per section)</em>";
        }
      } else {
        el.style.display = "none";
      }
    });

    document
      .querySelector(".ql-custom-dropdown")
      .addEventListener("change", function () {
        let value = this.value;
        quill
          .getModule("toolbar")
          .handlers["custom-dropdown"].call(quill, value);
        this.value = "";
      });

    engine.quill.clipboard.addMatcher(
      Node.ELEMENT_NODE,
      function (node, delta) {
        if (node.children.length > 0) {
          node.textContent += "\n";
        }
        return new Delta().insert(node.textContent);
      }
    );
  },

  checkRhymes: async () => {
    const word = document.getElementById("wordInput").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    if (!word) {
      resultsDiv.innerHTML = "<p>Please enter a word to search for.</p>";
      return;
    }

    try {
      const response = await fetch(
        `https://api.datamuse.com/words?rel_rhy=${word}`
      );
      const data = await response.json();

      if (data.length === 0) {
        resultsDiv.innerHTML = `<p>No rhyming words found for "${word}".</p>`;
        return;
      }

      data.forEach((item) => {
        const listItem = document.createElement("div");
        listItem.setAttribute(
          "class",
          "rhymingWord border p-2 rounded-lg text-lg font-bold"
        );

        listItem.textContent = item.word;
        resultsDiv.appendChild(listItem);
      });

      const rhymingWords = document.querySelectorAll(".rhymingWord");

      rhymingWords.forEach((rhymingWord) => {
        rhymingWord.addEventListener("click", (e) => {
          const text = rhymingWord.textContent;
          e.target.textContent = "Copied!";
          navigator.clipboard.writeText(text);

          setTimeout(() => {
            e.target.textContent = text;
          }, 700);
        });
      });
    } catch (error) {
      resultsDiv.innerHTML = `<p>Error fetching rhyming words: ${error.message}</p>`;
    }
  },

  save: () => {
    const title = document.getElementById("lyric-title").value;
    const id = document.getElementById("lyric-id").value;

    if (!id) {
      const lyrics = {
        title: title || "Untitled",
        content: engine.quill.root.innerHTML,
        id: engine.uuidv4(),
        created_at: new Date().toISOString(),
      };

      chrome.storage.local.get(["medioLyrics"], function (result) {
        const medioLyrics = result.medioLyrics || [];
        medioLyrics.push(lyrics);
        document.getElementById("lyric-id").value = lyrics.id;
        chrome.storage.local.set({ medioLyrics }, function () {
          console.log("Lyrics saved.", medioLyrics);
          alert("Saved!");
        });
      });
    } else {
      chrome.storage.local.get(["medioLyrics"], function (result) {
        const medioLyrics = result.medioLyrics || [];
        const lyrics = medioLyrics.find((lyric) => lyric.id === id);
        lyrics.title = title || "Untitled";
        lyrics.content = engine.quill.root.innerHTML;

        chrome.storage.local.set({ medioLyrics }, function () {
          console.log("Lyrics updated.", medioLyrics);
          alert("Updated!");
        });
      });
    }
  },

  uuidv4: () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },

  randomStartingText: () => {
    return engine.placeholders[
      Math.floor(Math.random() * engine.placeholders.length)
    ];
  },

  placeholders: [
    "Compose an epic song here...",
    "Write a love song...",
    "Pen your next hit single...",
    "Create a catchy chorus...",
    "Start your ballad here...",
    "Write lyrics from the heart...",
    "Craft a song about summer...",
    "Compose a tune for rainy days...",
    "Write a song about adventure...",
    "Create a melody about friendship...",
    "Compose a song about dreams...",
    "Write a song about overcoming obstacles...",
    "Start your song about a journey...",
    "Create a love anthem...",
    "Pen a song about heartbreak...",
    "Compose a lullaby...",
    "Write an empowering song...",
    "Create a festive holiday song...",
    "Compose a song about nostalgia...",
    "Write lyrics about nature...",
    "Start your soulful tune here...",
    "Compose a song for a special occasion...",
    "Write a song inspired by the night sky...",
    "Create a dance track...",
    "Pen a song about new beginnings...",
    "Compose a tune about city life...",
    "Write a song about peace...",
    "Create a whimsical song...",
    "Compose a song about hope...",
    "Write a song about the ocean...",
  ],

  state: {
    isRunning: false,
    isChecking: false,
  },
};

window.onload = function () {
  engine.init();
};
