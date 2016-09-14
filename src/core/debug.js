class Debug {
  post(args, style) {
    const arr = args;

    arr.unshift(
      `%c ${style.label} `,
      `background: ${style.background}; color: ${style.text}; border-radius: 5px;`
    );

    console.log.apply(console, arr);
  }

  label(label, ...args) {
    this.post(args, {
      label,
      background: '#e5e5e5',
      text: '#000',
    });
  }

  rainbow(label, ...args) {
    const bgStart = 'linear-gradient(to right bottom, green, yellow);';
    const bgEnd = 'linear-gradient(to right bottom, red, orange, yellow);';

    this.post(args, {
      label,
      background: label === 'start' ? bgStart : bgEnd,
      text: '#fff',
    });
  }

  log(label, ...args) {
    this.post(args, {
      label,
      background: '#e5e5e5',
      text: '#000',
    });
  }

  yellow(label, ...args) {
    this.post(args, {
      label,
      background: '#eecd7f',
      text: '#48390c',
    });
  }

  red(label, ...args) {
    this.post(args, {
      label,
      background: '#ee897f',
      text: '#7c2118',
    });
  }

  green(label, ...args) {
    this.post(args, {
      label,
      background: '#c9d5ac',
      text: '#36480c',
    });
  }

  stripe(label, color = '#aaa') {
    const labelLength = label.length;
    const lineLength = 40;
    const line = new Array(lineLength - labelLength - 3).join('—');

    console.log(`%c—— ${label} ${line}`, `color: ${color};`);
  }
}

export const debug = new Debug();
