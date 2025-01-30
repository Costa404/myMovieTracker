const Footer = () => {
  return (
    <div className=" border-top border-dark p-4  d-flex justify-content-center align-items-centerS">
      <div>
        <p className="fs-5"> &copy; 2025 Nuno Costa. All rights reserved.</p>
        <p className="fs-5 gap-5 d-flex">
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
