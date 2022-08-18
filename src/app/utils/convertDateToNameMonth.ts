export function convertDateToNameMonth(date: Date): String {
    // date.setMonth(monthNumber - 1);

    // return date.toLocaleString('en-US', {
    //   month: 'long',
    // });
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return `${monthNames[new Date(date).getMonth()]} ${new Date(
      date
    ).getFullYear()}`;
    //return monthNames[date.getMonth()];
    // return date !== null
    //   ? `${new Date(date).toISOString().slice(6, 7)} - ${new Date(date)
    //       .toISOString()
    //       .slice(0, 4)}`
    //   : '';
  }