import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router";

const OPACCard = ({
  Icon,
  Title,
  Message,
  Path,
}: {
  Icon: IconDefinition;
  Title: string;
  Message: string;
  Path: string;
}) => {
  return (
    <figure
      className="bg-Body text-white flex flex-col gap-5 items-center justify-center rounded-md
     max-sm:justify-start max-sm:px-2  max-sm:text-sm p-4 lg:h-full xl:h-full 2xl:h-full"
    >
      <FontAwesomeIcon
        icon={Icon}
        className="text-white h-6 w-6 cursor-default"
      />{" "}
      <figcaption className="text-center flex flex-col flex-grow justify-around ">
        <p>
          <span className=" text-lg font-bold">{Title}</span>
          <br />
          <span className="2xl:text-3xl lg:text-base">{Message}</span>
        </p>
        <Link to={Path} className=" underline hover:text-gray-400">
          Ver más
        </Link>
      </figcaption>
    </figure>
  );
};

export default OPACCard;
