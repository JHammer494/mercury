-- CreateTable
CREATE TABLE "PexSortie" (
    "id" SERIAL NOT NULL,
    "projected_launch" TIMESTAMP(0) NOT NULL,
    "projected_land" TIMESTAMP(0) NOT NULL,
    "unit_id" INTEGER,
    "required_fuel" INTEGER NOT NULL,
    "config" TEXT NOT NULL,
    "call_sign" TEXT NOT NULL,
    "aircraft_id" INTEGER,
    "is_quickturn" BOOLEAN,
    "is_ercc" BOOLEAN,

    CONSTRAINT "PexSortie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlyingSchedule" (
    "id" SERIAL NOT NULL,
    "published_on" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "FlyingSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sortie" (
    "id" SERIAL NOT NULL,
    "projected_launch" TIMESTAMP(0) NOT NULL,
    "projected_land" TIMESTAMP(0) NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "required_fuel" INTEGER NOT NULL,
    "config" TEXT NOT NULL,
    "call_sign" TEXT NOT NULL,
    "is_quickturn" BOOLEAN,
    "is_ercc" BOOLEAN,
    "aircraft_id" INTEGER,
    "crew_ready" TIMESTAMP(0),
    "crew_show" TIMESTAMP(0),
    "engine_start" TIMESTAMP(0),
    "taxi" TIMESTAMP(0),
    "actual_launch" TIMESTAMP(0),
    "actual_land" TIMESTAMP(0),
    "engine_shutdown" TIMESTAMP(0),
    "land_status" INTEGER,
    "is_published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sortie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpareFlyer" (
    "id" SERIAL NOT NULL,
    "aircraft_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "is_published" BOOLEAN DEFAULT false,

    CONSTRAINT "SpareFlyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "geo_loc_id" CHAR(4) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoLoc" (
    "id" CHAR(4) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GeoLoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "name" TEXT,
    "id" INTEGER NOT NULL,
    "fuel_quant" INTEGER NOT NULL,
    "status_id" TEXT NOT NULL,
    "parking_location" TEXT,
    "geo_loc_id" CHAR(4) NOT NULL,
    "preflight_inspection" TIMESTAMP(0) NOT NULL,
    "flight_hours" DOUBLE PRECISION NOT NULL,
    "mx_priority" INTEGER,
    "driver_jcn_unit" INTEGER,
    "driver_jcn_id" CHAR(9),
    "unit_id" INTEGER NOT NULL,
    "config" TEXT NOT NULL,
    "airframe_id" TEXT NOT NULL,
    "cur_oxygen" INTEGER NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airframe" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Airframe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JCN" (
    "id" SERIAL NOT NULL,
    "jcn_id" CHAR(9) NOT NULL,
    "aircraft_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "work_unit_code_id" VARCHAR(32) NOT NULL,
    "discrepancy" TEXT NOT NULL,
    "symbol" CHAR(1) NOT NULL,
    "when_discovered_id" CHAR(1) NOT NULL,
    "is_repeat" BOOLEAN NOT NULL DEFAULT false,
    "is_recur" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER,
    "etic" TIMESTAMP(0),
    "shop_id" CHAR(5) NOT NULL,
    "discovered_by_user_id" INTEGER NOT NULL,
    "when_created" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "when_modified" TIMESTAMP(0),
    "when_cleared" TIMESTAMP(0),

    CONSTRAINT "JCN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WCE" (
    "id" SERIAL NOT NULL,
    "wce_id" INTEGER NOT NULL,
    "jcn_id" CHAR(9) NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "work_unit_code_id" VARCHAR(32) NOT NULL,
    "discrepancy" TEXT NOT NULL,
    "symbol" CHAR(1) NOT NULL,
    "when_discovered_id" CHAR(1) NOT NULL,
    "type_mx_id" CHAR(1),
    "action_taken_id" CHAR(1),
    "corrective_action" TEXT,
    "discovered_by_user_id" INTEGER NOT NULL,
    "corrected_by_user_id" INTEGER,
    "inspected_by_user_id" INTEGER,
    "shop_id" CHAR(5) NOT NULL,
    "how_mal_id" CHAR(3),
    "when_created" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "when_modified" TIMESTAMP(0),
    "start_time" TIMESTAMP(0),
    "stop_time" TIMESTAMP(0),

    CONSTRAINT "WCE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeMx" (
    "id" CHAR(1) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TypeMx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkUnitCode" (
    "id" VARCHAR(32) NOT NULL,
    "description" TEXT NOT NULL,
    "airframe_id" TEXT NOT NULL,

    CONSTRAINT "WorkUnitCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhenDiscovered" (
    "id" CHAR(1) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "WhenDiscovered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HowMal" (
    "id" CHAR(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "HowMal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" CHAR(5) NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(0),
    "roles" TEXT NOT NULL DEFAULT E'boot',
    "shop_id" CHAR(5),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AircraftNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "aircraft_id" INTEGER NOT NULL,
    "jcn_id" INTEGER,

    CONSTRAINT "AircraftNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "PersonalNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HourlyInspection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inspection_details" TEXT NOT NULL,
    "frequency" DOUBLE PRECISION NOT NULL,
    "last_completed" DOUBLE PRECISION NOT NULL,
    "aircraft_id" INTEGER NOT NULL,

    CONSTRAINT "HourlyInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarInspection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inspection_details" TEXT NOT NULL,
    "frequency" DOUBLE PRECISION NOT NULL,
    "last_completed" TIMESTAMP(0) NOT NULL,
    "aircraft_id" INTEGER NOT NULL,

    CONSTRAINT "CalendarInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebriefForm" (
    "id" SERIAL NOT NULL,
    "landing_fuel" DOUBLE PRECISION NOT NULL,
    "bird_strike" BOOLEAN NOT NULL,
    "air_refuel_callsign" TEXT,
    "air_refuel_amount" DOUBLE PRECISION,
    "drag_chute" BOOLEAN NOT NULL,
    "hung_store" BOOLEAN NOT NULL,
    "in_flight_emergency" BOOLEAN NOT NULL,
    "bomb_door_actuation" BOOLEAN NOT NULL,
    "sortie_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "submitted" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebriefForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionTaken" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ActionTaken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpareFlyer_aircraft_id_date_key" ON "SpareFlyer"("aircraft_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_unit_id_id_key" ON "Aircraft"("unit_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_driver_jcn_unit_driver_jcn_id_key" ON "Aircraft"("driver_jcn_unit", "driver_jcn_id");

-- CreateIndex
CREATE UNIQUE INDEX "JCN_unit_id_jcn_id_key" ON "JCN"("unit_id", "jcn_id");

-- CreateIndex
CREATE UNIQUE INDEX "WCE_unit_id_jcn_id_wce_id_key" ON "WCE"("unit_id", "jcn_id", "wce_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Sortie" ADD CONSTRAINT "Sortie_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sortie" ADD CONSTRAINT "Sortie_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpareFlyer" ADD CONSTRAINT "SpareFlyer_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_geo_loc_id_fkey" FOREIGN KEY ("geo_loc_id") REFERENCES "GeoLoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_geo_loc_id_fkey" FOREIGN KEY ("geo_loc_id") REFERENCES "GeoLoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_airframe_id_fkey" FOREIGN KEY ("airframe_id") REFERENCES "Airframe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_driver_jcn_unit_driver_jcn_id_fkey" FOREIGN KEY ("driver_jcn_unit", "driver_jcn_id") REFERENCES "JCN"("unit_id", "jcn_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_unit_id_aircraft_id_fkey" FOREIGN KEY ("unit_id", "aircraft_id") REFERENCES "Aircraft"("unit_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_work_unit_code_id_fkey" FOREIGN KEY ("work_unit_code_id") REFERENCES "WorkUnitCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_when_discovered_id_fkey" FOREIGN KEY ("when_discovered_id") REFERENCES "WhenDiscovered"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JCN" ADD CONSTRAINT "JCN_discovered_by_user_id_fkey" FOREIGN KEY ("discovered_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_unit_id_jcn_id_fkey" FOREIGN KEY ("unit_id", "jcn_id") REFERENCES "JCN"("unit_id", "jcn_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_type_mx_id_fkey" FOREIGN KEY ("type_mx_id") REFERENCES "TypeMx"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_work_unit_code_id_fkey" FOREIGN KEY ("work_unit_code_id") REFERENCES "WorkUnitCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_when_discovered_id_fkey" FOREIGN KEY ("when_discovered_id") REFERENCES "WhenDiscovered"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_how_mal_id_fkey" FOREIGN KEY ("how_mal_id") REFERENCES "HowMal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_discovered_by_user_id_fkey" FOREIGN KEY ("discovered_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_corrected_by_user_id_fkey" FOREIGN KEY ("corrected_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_inspected_by_user_id_fkey" FOREIGN KEY ("inspected_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WCE" ADD CONSTRAINT "WCE_action_taken_id_fkey" FOREIGN KEY ("action_taken_id") REFERENCES "ActionTaken"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkUnitCode" ADD CONSTRAINT "WorkUnitCode_airframe_id_fkey" FOREIGN KEY ("airframe_id") REFERENCES "Airframe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roles_fkey" FOREIGN KEY ("roles") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftNote" ADD CONSTRAINT "AircraftNote_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftNote" ADD CONSTRAINT "AircraftNote_jcn_id_fkey" FOREIGN KEY ("jcn_id") REFERENCES "JCN"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftNote" ADD CONSTRAINT "AircraftNote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalNote" ADD CONSTRAINT "PersonalNote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HourlyInspection" ADD CONSTRAINT "HourlyInspection_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarInspection" ADD CONSTRAINT "CalendarInspection_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "Aircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebriefForm" ADD CONSTRAINT "DebriefForm_sortie_id_fkey" FOREIGN KEY ("sortie_id") REFERENCES "Sortie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebriefForm" ADD CONSTRAINT "DebriefForm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
