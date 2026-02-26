export default function calculateLevel(xp) {
    if (xp < 100) return 1
    if (xp < 250) return 2
    if (xp < 500) return 3
    if (xp < 900) return 4
    if (xp < 1500) return 5

    return Math.floor(xp / 500) + 3
}