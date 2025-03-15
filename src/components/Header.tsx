
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-purple-600">
              Gather <span className="text-sm font-medium text-purple-400">To Play</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground/80 ${
                isActive("/") ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {t("header.home")}
            </Link>
            <Link
              to="/events"
              className={`transition-colors hover:text-foreground/80 ${
                isActive("/events") ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {t("header.events")}
            </Link>
            <Link
              to="/groups"
              className={`transition-colors hover:text-foreground/80 ${
                isActive("/groups") ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {t("header.groups")}
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <Link to="/login">
            <Button variant="outline" size="sm">
              {t("common.signIn")}
            </Button>
          </Link>
          <Link to="/create-event">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              {t("common.createEvent")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
