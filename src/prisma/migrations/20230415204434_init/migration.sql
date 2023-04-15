-- CreateTable
CREATE TABLE "diagrams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "in_house" BOOLEAN NOT NULL,
    "is_processed" BOOLEAN NOT NULL,

    CONSTRAINT "diagrams_pkey" PRIMARY KEY ("id")
);
