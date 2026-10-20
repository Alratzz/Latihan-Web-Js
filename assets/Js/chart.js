
/* =================================
   KONFIGURASI CHART.JS
================================= */

// Ganti jenis grafik cukup di sini:
// bar, line, pie, doughnut, radar, polarArea
const chartType = "line";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("skillsChart");
    const fallback = document.getElementById("skillsChartFallback");

    if (!canvas) return;

    if (typeof Chart === "undefined") {
        if (fallback) fallback.hidden = false;
        console.error("Chart.js belum berhasil dimuat.");
        return;
    }

    // Ambil data dari progress bar di bagian About
    const cards = document.querySelectorAll(".skill-card");

    const labels = [...cards].map(card =>
        card.querySelector(".skill-info span").textContent.trim()
    );

    const values = [...cards].map(card =>
        Number(
            card.querySelector(".progress-bar")
                .getAttribute("aria-valuenow")
        )
    );

    const circular = ["pie", "doughnut", "polarArea"];
    const isCircular = circular.includes(chartType);

    new Chart(canvas, {
        type: chartType,

        data: {
            labels,
            datasets: [{
                label: "Keahlian (%)",
                data: values,
                backgroundColor: [
                    "#D9A441",
                    "#087BFF",
                    "#5C8D89"
                ],
                borderColor: "#111111",
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: isCircular,
                    labels: { color: "#FFFFFF" }
                },
                tooltip: {
                    callbacks: {
                        label: context =>
                            `${context.label}: ${context.raw}%`
                    }
                }
            },

            scales: isCircular ? {} : {
                x: {
                    ticks: { color: "#FFFFFF" },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: "#FFFFFF",
                        callback: value => `${value}%`
                    },
                    grid: {
                        color: "rgba(255,255,255,0.12)"
                    }
                }
            }
        }
    });
});
