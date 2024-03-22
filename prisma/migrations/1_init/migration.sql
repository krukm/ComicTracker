-- CreateTable
CREATE TABLE "collection" (
    "issue_id" INTEGER NOT NULL,
    "issue_number" TEXT NOT NULL,
    "issue_name" VARCHAR(255) NOT NULL,
    "cover_date" VARCHAR(255) NOT NULL,
    "series_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_issueid" PRIMARY KEY ("issue_id")
);

