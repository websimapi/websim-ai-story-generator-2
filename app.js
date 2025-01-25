async function getAIStyleSuggestion(elementType, currentStyle) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate creative CSS styles for a ${elementType} element.
        
        interface Response {
          styles: {
            background?: string;
            color?: string;
            transform?: string;
            animation?: string;
            border?: string;
            boxShadow?: string;
            borderRadius?: string;
            padding?: string;
            fontSize?: string;
          }
        }
        
        {
          "styles": {
            "background": "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            "color": "#ffffff",
            "transform": "rotate(5deg)",
            "animation": "bounce 1s infinite"
          }
        }
        `,
        data: `Current style: ${currentStyle}`
      })
    });
    
    const data = await response.json();
    return data.styles;
  } catch (error) {
    console.error('Error fetching AI style suggestion:', error);
    return null;
  }
}

function applyStylesToElement(element, styles) {
  const statusEl = document.querySelector('.status');
  statusEl.textContent = 'Applying new AI-generated styles...';
  
  Object.assign(element.style, styles);
  
  statusEl.textContent = 'Styles updated! Click another element to continue.';
}

document.querySelectorAll('[data-interactive]').forEach(element => {
  element.addEventListener('click', async () => {
    const elementType = element.tagName.toLowerCase();
    const currentStyle = element.getAttribute('style') || 'none';
    
    const newStyles = await getAIStyleSuggestion(elementType, currentStyle);
    
    if (newStyles) {
      applyStylesToElement(element, newStyles);
    }
  });
});