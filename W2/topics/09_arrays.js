const textarea = document.getElementById("playlistInput");
const output = document.getElementById("output");
const processBtn = document.getElementById("processBtn");

processBtn.addEventListener("click", () => {
  const lines = textarea.value.split("\n").filter(Boolean);

  const songs = lines.map((line) => {
    const [title, minutes] = line.split(",");
    return {
      title: title.trim(),
      minutes: Number(minutes ?? 0),
    };
  });

  const longSongs = songs.filter((song) => song.minutes >= 5);
  const totalDuration = songs.reduce((sum, song) => sum + song.minutes, 0);
  const titles = songs.map((song, index) => `${index + 1}. ${song.title}`);

  const summary = {
    totalSongs: songs.length,
    totalDurationMinutes: totalDuration,
    hasLongSongs: longSongs.length > 0,
    playlistTitles: titles,
  };

  output.textContent = JSON.stringify(summary, null, 2);
});
