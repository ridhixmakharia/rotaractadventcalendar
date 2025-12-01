import { useEffect, useRef } from 'react';

const Snowfall = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const snowflakes = [];
        const snowflakeCount = 100;

        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            for (let i = 0; i < snowflakeCount; i++) {
                const f = snowflakes[i];
                ctx.moveTo(f.x, f.y);
                ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
            }
            ctx.fill();
            move();
        }

        function move() {
            for (let i = 0; i < snowflakeCount; i++) {
                const f = snowflakes[i];
                f.y += f.speed;
                f.x += Math.sin(f.y / 50) * 0.5;

                if (f.y > height) {
                    snowflakes[i] = {
                        x: Math.random() * width,
                        y: 0,
                        radius: f.radius,
                        speed: f.speed,
                        opacity: f.opacity,
                    };
                }
            }
        }

        let animationFrameId;
        function animate() {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default Snowfall;
