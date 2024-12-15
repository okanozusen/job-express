--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: mrmongol
--

CREATE TABLE public.companies (
    handle character varying(25) NOT NULL,
    name text NOT NULL,
    num_employees integer,
    description text NOT NULL,
    logo_url text,
    CONSTRAINT companies_handle_check CHECK (((handle)::text = lower((handle)::text))),
    CONSTRAINT companies_num_employees_check CHECK ((num_employees >= 0))
);


ALTER TABLE public.companies OWNER TO mrmongol;

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: mrmongol
--

COPY public.companies (handle, name, num_employees, description, logo_url) FROM stdin;
bauer-gallagher	Bauer-Gallagher	862	Difficult ready trip question produce produce someone.	\N
edwards-lee-reese	Edwards, Lee and Reese	744	To much recent it reality coach decision Mr. Dog language evidence minute either deep situation pattern. Other cold bad loss surface real show.	/logos/logo2.png
hall-davis	Hall-Davis	749	Adult go economic off into. Suddenly happy according only common. Father plant wrong free traditional.	/logos/logo2.png
watson-davis	Watson-Davis	819	Year join loss.	/logos/logo3.png
baker-santos	Baker-Santos	225	Compare certain use. Writer time lay word garden. Resource task interesting voice.	/logos/logo3.png
erickson-inc	Erickson Inc	267	Interesting environment owner beautiful school politics. General friend hair player dinner last administration teacher.	/logos/logo4.png
norman-harvey	Norman-Harvey	\N	Drop along test material education. Opportunity forget campaign federal certainly total hair.	/logos/logo4.png
boyd-evans	Boyd-Evans	698	Build respond generation tree. No five keep. Happy medical back fine focus suffer modern.	/logos/logo4.png
mitchell-brown	Mitchell-Brown	288	Republican truth church generation voice price issue.	/logos/logo1.png
russo-gillespie-conrad	Russo, Gillespie and Conrad	398	South sound knowledge guy. Up I size anyone issue drop. Agent light significant mouth while.	/logos/logo2.png
ingram-ferguson-rubio	Ingram, Ferguson and Rubio	753	Human summer field mean impact could exactly. Business read north project will. Left dream use Democrat.	/logos/logo3.png
anderson-arias-morrow	Anderson, Arias and Morrow	245	Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.	/logos/logo3.png
jackson-sons	Jackson and Sons	649	President couple political sit create.	/logos/logo4.png
miller-woods-hernandez	Miller, Woods and Hernandez	444	Including theory protect reveal energy himself probably. Test leave mother area however.	/logos/logo4.png
arnold-berger-townsend	Arnold, Berger and Townsend	795	Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.	\N
davis-davis	Davis-Davis	23	Career participant difficult. Decide claim particular century society. Question growth two staff.	\N
smith-llc	Smith LLC	908	Statement use per mission method. Order truth method.	\N
morgan-sullivan	Morgan-Sullivan	409	Own once artist part put authority wait. Focus free even. Why friend civil visit.	\N
taylor-yu-lee	Taylor, Yu and Lee	226	Down bag serve. Officer season company.	/logos/logo2.png
scott-smith	Scott-Smith	993	Room newspaper foot. Student daughter their themselves top almost near. Wait time recently it street follow medical nothing.	/logos/logo2.png
garcia-ray	Garcia-Ray	217	Laugh low follow fear. Politics main size fine.	/logos/logo2.png
logan-miller	Logan-Miller	429	Pattern hand where never. Social across ability which structure.	\N
hudson-inc	Hudson Inc	627	End now meet staff. Long government force why bar. Provide bring hope staff almost many be a.	\N
rivas-llc	Rivas LLC	552	Would road lot research wide mouth. Resource along office drug.	\N
garner-michael	Garner-Michael	940	Necessary thousand parent since discuss director. Visit machine skill five the.	\N
owen-newton	Owen-Newton	953	Red compare try way. Bed standard again number wrong force. Stop exactly agent product economy someone. North describe site manager employee customer.	\N
foster-rice	Foster-Rice	901	Either relate himself. Source TV data one general. Actually than seat eight.	\N
moore-plc	Moore PLC	100	Magazine thing eight shake window might they organization. Environmental it bag green.	\N
ayala-buchanan	Ayala-Buchanan	309	Make radio physical southern. His white on attention kitchen market upon. Represent west open seven. Particularly subject billion much score thank bag somebody.	\N
willis-henson-miller	Willis, Henson and Miller	821	About dream practice. Father significant senior health within four.	\N
stone-stewart	Stone-Stewart	459	Require successful family but. Traditional article late eight lose common send budget. Better opportunity law country various represent strong probably.	\N
wiggins-frederick-boyer	Wiggins, Frederick and Boyer	298	Institution structure say argue bit. Each option high executive easy pattern. Majority white hour there reach drive produce.	/logos/logo2.png
reynolds-greene	Reynolds-Greene	343	Effect win area officer office economy. Congress travel would resource difficult. Nice president mind dinner.	/logos/logo2.png
perez-miller	Perez-Miller	298	Space one approach wife son. Themselves give necessary follow employee return feel. Step animal doctor sign water early.	/logos/logo4.png
burton-ltd	Burton Ltd	610	Cover couple speech bar cell measure movement finally. Nation pull inside.	/logos/logo4.png
gillespie-smith	Gillespie-Smith	302	Candidate ability democratic make drug. Player themselves like front. Over through style loss win very when.	/logos/logo1.png
martinez-daniels	Martinez-Daniels	12	Five source market nation. Drop foreign raise pass.	/logos/logo4.png
jackson-davila-conley	Jackson, Davila and Conley	813	Consider with build either.	/logos/logo4.png
salas-group	Salas Group	624	Central whom mouth partner bring newspaper special city. Show second cost newspaper can early play.	/logos/logo4.png
thomas-sons	Thomas and Sons	51	Book detail scene continue. Art strategy because list two.	/logos/logo1.png
mejia-scott-ryan	Mejia, Scott and Ryan	\N	General traditional late situation discussion dog. Before best up strategy about direction.	/logos/logo4.png
mueller-moore	Mueller-Moore	932	Edge may report though least pressure likely. Cost short appear program hair seven.	/logos/logo2.png
pugh-ltd	Pugh Ltd	87	Believe reflect perform TV son.	/logos/logo2.png
carr-wells-jones	Carr, Wells and Jones	27	Human medical throw book pick possible. Maybe yeah word beat treatment impact campaign.	/logos/logo3.png
hall-mills	Hall-Mills	266	Change stage tell note hundred. Worry where program wait.	/logos/logo3.png
robbins-marsh-martin	Robbins, Marsh and Martin	709	Now never worry usually another ability concern hair. Fly lot six protect participant. Teach through head.	/logos/logo3.png
sellers-bryant	Sellers-Bryant	369	Language discussion mission soon wait according executive. Financial say husband anyone money politics. Dinner action purpose mouth environment I white.	/logos/logo3.png
humphrey-llc	Humphrey LLC	678	Agent actually able paper nor. Tell then court full agree without assume.	/logos/logo4.png
graham-herring-lane	Graham, Herring and Lane	188	Enough attack return. Fall gas someone her another point those. Star public painting show concern.	/logos/logo4.png
weber-hernandez	Weber-Hernandez	681	Contain product south picture scientist.	/logos/logo4.png
\.


--
-- Name: companies companies_name_key; Type: CONSTRAINT; Schema: public; Owner: mrmongol
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_name_key UNIQUE (name);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: mrmongol
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (handle);


--
-- PostgreSQL database dump complete
--

