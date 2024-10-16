export function LoadingDots() {
    return (
      <span className="inline-flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${0.2 * i}s`,
              backgroundColor: "black",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              display: "inline-block",
              margin: "0 1px",
            }}
            className="animate-blink"
          />
        ))}
      </span>
    );
}