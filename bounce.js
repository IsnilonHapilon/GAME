document.addEventListener("DOMContentLoaded", () => {
      const player = document.getElementById("player");
      const opponent = document.getElementById("opponent");
  
      // Set initial positions and velocities
      const entities = [
          { element: player, x: 50, y: 50, dx: 2, dy: 2 },
          { element: opponent, x: 300, y: 200, dx: -3, dy: 2 },
      ];
  
      function updateContainerSize() {
          return {
              width: window.innerWidth,
              height: window.innerHeight,
          };
      }
  
      let container = updateContainerSize();
  
      // Resize listener for dynamic screen size adjustment
      window.addEventListener("resize", () => {
          container = updateContainerSize();
      });
  
      // Function to move and bounce entities
      function bounce() {
          entities.forEach((entity) => {
              const { element } = entity;
              const imageWidth = element.offsetWidth;
              const imageHeight = element.offsetHeight;
  
              // Update position
              entity.x += entity.dx;
              entity.y += entity.dy;
  
              // Reverse direction and clamp position if hitting an edge
              if (entity.x <= 0) {
                  entity.dx = Math.abs(entity.dx); // Ensure positive direction
                  entity.x = 0; // Correct overlap
              } else if (entity.x + imageWidth >= container.width) {
                  entity.dx = -Math.abs(entity.dx); // Ensure negative direction
                  entity.x = container.width - imageWidth; // Correct overlap
              }
  
              if (entity.y <= 0) {
                  entity.dy = Math.abs(entity.dy); // Ensure positive direction
                  entity.y = 0; // Correct overlap
              } else if (entity.y + imageHeight >= container.height) {
                  entity.dy = -Math.abs(entity.dy); // Ensure negative direction
                  entity.y = container.height - imageHeight; // Correct overlap
              }
  
              // Apply the new position
              element.style.transform = `translate(${entity.x}px, ${entity.y}px)`;
          });
  
          requestAnimationFrame(bounce);
      }
  
      // Start the bouncing animation
      bounce();
  });
  