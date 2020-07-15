class Opponent extends Player {
  constructor(position) {
    super(position);
  }

  animate = (destination) => {

    let x = this.position.x;
    let z = this.position.z;
    let dx = (destination.x - this.position.x);
    let dz = (destination.z - this.position.z);
    let time = {
      'total': 1000,
      'elapsed': 0
    };

    const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);
    const easeOut = progress => Math.pow(--progress, 5) + 1;

    const easeTranslate = (now) => {

      if (!time.start) {
        time.start = now;
      } else {
        time.elapsed = now - time.start;
      }

      const progress = getProgress(time);
      const easing = easeOut(progress);

      this.position.x = x + dx * easing;
      this.position.z = z + dz * easing;
      if (progress < 1) requestAnimationFrame(easeTranslate);
    }

    requestAnimationFrame(easeTranslate);
  }
}