export function msToTimeString(ms: number) {
    const duration = ms / 1000;
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60;

    const result = [hours, minutes, seconds.toFixed(0)]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return result
 
}