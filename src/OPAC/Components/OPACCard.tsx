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
    <figure className="bg-Body text-white rounded-md space-y-3 text-center p-4 relative flex flex-col h-full">
      <FontAwesomeIcon icon={Icon} className=" h-6 max-sm:h-6" />{" "}
      <figcaption className="text-center flex flex-col flex-grow">
        <p className="flex-grow mb-2">
          <span className="text-lg max-sm:text-xs">{Title}</span>
          <br />
          <span className=" max-sm:hidden">{Message}</span>
        </p>
        <Link to={Path} className=" underline hover:text-gray-400">
          Ver más
        </Link>
      </figcaption>
    </figure>
  );
};

export default OPACCard;
