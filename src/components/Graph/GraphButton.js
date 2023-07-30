const GraphButton = ({ children, selected, onClick }) => {
  
    return (
      <span onClick={onClick} 
          style={
            {border: "1px solid #ac32e4",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "#ac32e4" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "#7918f2",
          color: "black",
        },
        width: "22%"}}
      >
        {children}
      </span>
    );
  };
  
  export default GraphButton;